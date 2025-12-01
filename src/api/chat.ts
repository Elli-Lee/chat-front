const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export interface ChatRequest {
  message: string;
}

export interface ChatStreamResponse {
  status?: "streaming" | "completed";
  type?: "content";
  content?: string;
}

/**
 * SSE를 통해 채팅 메시지를 전송하고 스트리밍 응답을 받습니다.
 * @param message 사용자 메시지
 * @param onMessage 스트리밍 메시지 수신 시 호출되는 콜백
 * @param onComplete 스트리밍 완료 시 호출되는 콜백
 * @param onError 에러 발생 시 호출되는 콜백
 * @returns abort 함수를 반환하여 스트리밍을 중단할 수 있습니다.
 */
export const sendChatMessage = (
  message: string,
  onMessage: (message: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void
) => {
  const controller = new AbortController();

  fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message } as ChatRequest),
    signal: controller.signal,
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response body is not readable");
      }

      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();

              if (data === "[DONE]") {
                onComplete();
                return;
              }

              try {
                const parsed: ChatStreamResponse = JSON.parse(data);

                // 스트리밍 시작
                if (parsed.status === "streaming") {
                  // 첫 시작 메시지는 무시 (content가 없음)
                  continue;
                }
                // 스트리밍 완료
                else if (parsed.status === "completed") {
                  onComplete();
                  return;
                }
                // 실제 콘텐츠 메시지
                else if (parsed.type === "content" && parsed.content) {
                  // LLM 토큰 제거 (<|im_end|><|endofturn|> 등)
                  const cleanedContent = parsed.content.replace(
                    /<\|im_end\|><\|endofturn\|>/g,
                    ""
                  );
                  onMessage(cleanedContent);
                }
              } catch {
                console.warn("Failed to parse SSE data:", data);
              }
            }
          }
        }

        onComplete();
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Request cancelled");
        } else {
          onError(
            error instanceof Error ? error : new Error("Stream read error")
          );
        }
      }
    })
    .catch((error) => {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request cancelled");
      } else {
        onError(error instanceof Error ? error : new Error("Network error"));
      }
    });

  return () => controller.abort();
};
