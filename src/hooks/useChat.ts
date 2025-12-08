import { useState, useRef, useCallback } from "react";
import { sendChatMessage } from "../api/chat";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isStreaming?: boolean;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "안녕하세요! 오케스트로 제품 요구사항 검색 챗봇입니다. 무엇을 도와드릴까요?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<(() => void) | null>(null);

  const sendMessage = useCallback((userMessage: string) => {
    // 이전 요청이 있다면 중단
    if (abortRef.current) {
      abortRef.current();
    }

    // 사용자 메시지 추가
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setIsStreaming(true);

    // 봇 메시지 ID 미리 생성
    const botMessageId = (Date.now() + 1).toString();
    let hasStartedStreaming = false;

    // SSE 요청 시작
    const abort = sendChatMessage(
      userMessage,
      // onMessage: 스트리밍 메시지 수신
      (streamedText: string) => {
        setIsTyping(false);

        if (!hasStartedStreaming) {
          // 첫 메시지 - 새 봇 메시지 추가
          hasStartedStreaming = true;
          const initialMessage: Message = {
            id: botMessageId,
            text: streamedText,
            sender: "bot",
            timestamp: new Date(),
            isStreaming: true,
          };
          setMessages((prev) => [...prev, initialMessage]);
        } else {
          // 이후 메시지 - 마지막 메시지만 업데이트 (성능 최적화)
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            if (lastIndex >= 0 && newMessages[lastIndex].id === botMessageId) {
              newMessages[lastIndex] = {
                ...newMessages[lastIndex],
                text: streamedText,
                isStreaming: true,
              };
            }
            return newMessages;
          });
        }
      },
      // onComplete: 스트리밍 완료
      () => {
        setIsTyping(false);
        setIsStreaming(false);
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          if (lastIndex >= 0 && newMessages[lastIndex].id === botMessageId) {
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              isStreaming: false,
            };
          }
          return newMessages;
        });
        abortRef.current = null;
      },
      // onError: 에러 처리
      (error: Error) => {
        setIsTyping(false);
        setIsStreaming(false);
        console.error("Chat error:", error);

        // 에러 메시지 추가
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        abortRef.current = null;
      }
    );

    abortRef.current = abort;
  }, []);

  const stopStreaming = useCallback(() => {
    if (abortRef.current) {
      abortRef.current();
      abortRef.current = null;
    }
    setIsTyping(false);
    setIsStreaming(false);
    // 현재 스트리밍 중인 메시지의 isStreaming을 false로 변경 (마지막 메시지만 체크)
    setMessages((prev) => {
      const newMessages = [...prev];
      const lastIndex = newMessages.length - 1;
      if (lastIndex >= 0 && newMessages[lastIndex].isStreaming) {
        newMessages[lastIndex] = {
          ...newMessages[lastIndex],
          isStreaming: false,
        };
      }
      return newMessages;
    });
  }, []);

  return {
    messages,
    isTyping,
    isStreaming,
    sendMessage,
    stopStreaming,
  };
};

