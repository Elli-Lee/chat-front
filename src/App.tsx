import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Square, Home } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "./assets/logo.png";
import { useChat } from "./hooks/useChat";
import { MarkdownContent } from "./components/MarkdownContent";

export default function App() {
  const { messages, isTyping, isStreaming, sendMessage, stopStreaming, resetChat } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() === "" || isStreaming) return;

    // 첫 메시지일 경우 채팅 시작
    if (!chatStarted) {
      setChatStarted(true);
    }

    // API를 통해 메시지 전송
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleStop = () => {
    stopStreaming();
  };

  const handleGoHome = () => {
    resetChat(); // 스트리밍 중지 및 채팅 초기화
    setChatStarted(false);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-100 via-blue-50 to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements - Wave Gradient Style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Wave layers */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 31, 92, 0.03) 0%, rgba(0, 48, 135, 0.05) 100%)",
          }}
        />

        {/* Wave 1 - Bottom layer */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-full opacity-20"
          animate={{
            x: ["-100%", "0%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            className="absolute bottom-0 w-[200%] h-[60%]"
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
          >
            <path
              d="M0,300 C200,200 400,400 600,300 C800,200 1000,400 1200,300 L1200,600 L0,600 Z"
              fill="url(#gradient1)"
              opacity="0.8"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 31, 92, 0.15)" />
                <stop offset="100%" stopColor="rgba(0, 48, 135, 0.25)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Wave 2 - Middle layer */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-full opacity-25"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            className="absolute bottom-0 w-[200%] h-[50%]"
            viewBox="0 0 1200 500"
            preserveAspectRatio="none"
          >
            <path
              d="M0,250 C300,150 500,350 800,250 C1000,180 1100,300 1200,250 L1200,500 L0,500 Z"
              fill="url(#gradient2)"
              opacity="0.7"
            />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                <stop offset="100%" stopColor="rgba(30, 58, 138, 0.3)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Wave 3 - Top layer */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-full opacity-30"
          animate={{
            x: ["-100%", "0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            className="absolute bottom-0 w-[200%] h-[40%]"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
          >
            <path
              d="M0,200 C250,120 450,280 700,200 C900,140 1050,260 1200,200 L1200,400 L0,400 Z"
              fill="url(#gradient3)"
              opacity="0.6"
            />
            <defs>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.15)" />
                <stop offset="100%" stopColor="rgba(0, 31, 92, 0.2)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Floating subtle accents */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#001f5c]/5 rounded-full filter blur-2xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-40 h-40 bg-blue-500/5 rounded-full filter blur-2xl"
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {!chatStarted ? (
        // 초기 진입 페이지
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[820px] relative z-10"
        >
          <div className="bg-white/40 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-white/50 px-20 py-16 flex flex-col items-center justify-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className="mb-10"
            >
              <img
                src={logo}
                alt="Okestro Logo"
                className="w-[72px] h-[72px] object-contain"
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[28px] font-semibold bg-linear-to-r from-[#001f5c] to-[#003087] bg-clip-text text-transparent mb-12"
            >
              OKESTRO
            </motion.h1>

            {/* Welcome message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center mb-16"
            >
              <p className="text-slate-600 text-[17px] leading-relaxed">
                플랫폼 개발본부 제품 요구사항 검색 챗봇입니다.
                <br />
                무엇을 도와드릴까요?
              </p>
            </motion.div>

            {/* Input field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-full"
            >
              <div className="flex gap-3 items-center bg-white/90 backdrop-blur-xl rounded-[24px] shadow-lg border border-white/80 p-3 focus-within:ring-2 focus-within:ring-[#001f5c]/20 transition-all">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="요구사항을 검색해보세요..."
                  className="flex-1 px-4 py-3 bg-transparent resize-none focus:outline-none placeholder:text-slate-400 text-slate-800 text-[15px]"
                  rows={1}
                  style={{ maxHeight: "120px" }}
                  autoFocus
                />
                <motion.button
                  onClick={isStreaming ? handleStop : handleSend}
                  disabled={!isStreaming && inputValue.trim() === ""}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-linear-to-br from-[#001f5c] to-[#003087] text-white p-3.5 rounded-[20px] shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  {isStreaming ? (
                    <Square className="w-5 h-5" fill="currentColor" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        // 채팅 페이지
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl h-[88vh] relative z-10"
        >
          {/* Glass container */}
          <div className="h-full bg-white/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="relative px-8 pt-6 pb-4">
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Logo */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className="relative"
                  >
                    <img
                      src={logo}
                      alt="Okestro Logo"
                      className="w-9 h-9 object-contain"
                    />
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h1 className="text-lg bg-linear-to-r from-[#001f5c] to-[#003087] bg-clip-text text-transparent">
                      OKESTRO
                    </h1>
                  </motion.div>
                </div>

                {/* Home Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  onClick={handleGoHome}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 transition-all"
                  title="홈으로 돌아가기"
                >
                  <Home className="w-6 h-6 text-[#001f5c]/70 hover:text-[#001f5c] transition-colors" />
                </motion.button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-8 pb-6 py-4 space-y-8">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.sender === "user" ? (
                      // User message
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="max-w-[75%]"
                      >
                        <div className="relative group">
                          {/* Glow effect */}
                          <div className="absolute inset-0 bg-blue-400/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="relative bg-linear-to-br from-white to-blue-50 rounded-3xl rounded-br-md px-6 py-4 shadow-md border border-blue-100/50">
                            <p className="text-slate-800 whitespace-pre-wrap wrap-break-word">
                              {message.text}
                            </p>
                            <div className="flex items-center justify-end gap-2 mt-2">
                              <span className="text-xs text-slate-500">
                                {message.timestamp.toLocaleTimeString("ko-KR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      // Bot message - 말풍선 없이 표현
                      <div className="w-full px-2">
                        <div className="flex items-start gap-3">
                          {/* Bot avatar */}
                          <div className="w-8 h-8 bg-linear-to-br from-[#001f5c] to-[#003087] rounded-xl flex items-center justify-center shrink-0 shadow-md">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>

                          {/* Message content */}
                          <div className="flex-1 min-w-0">
                            <div className="text-slate-800 leading-relaxed">
                              <MarkdownContent content={message.text} />
                              {message.isStreaming && (
                                <motion.span
                                  className="inline-block w-1 h-4 bg-[#001f5c] ml-0.5"
                                  animate={{ opacity: [1, 0] }}
                                  transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                  }}
                                />
                              )}
                            </div>
                            {!message.isStreaming && message.text && (
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-slate-400">
                                  {message.timestamp.toLocaleTimeString(
                                    "ko-KR",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/60 backdrop-blur-xl rounded-3xl rounded-bl-md px-6 py-4 shadow-md border border-white/50">
                    <div className="flex gap-1.5">
                      <motion.div
                        className="w-2 h-2 bg-[#001f5c]/60 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-[#001f5c]/60 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-[#001f5c]/60 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6">
              <div className="relative">
                <div className="flex gap-2 items-center bg-white/80 backdrop-blur-xl rounded-[20px] shadow-lg border border-white/80 p-2 focus-within:ring-2 focus-within:ring-[#001f5c]/20 transition-all">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="요구사항을 검색해보세요..."
                    className="flex-1 px-4 py-2.5 bg-transparent resize-none focus:outline-none placeholder:text-slate-400 text-slate-800"
                    rows={1}
                    style={{ maxHeight: "120px" }}
                  />
                  <motion.button
                    onClick={isStreaming ? handleStop : handleSend}
                    disabled={!isStreaming && inputValue.trim() === ""}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-linear-to-br from-[#001f5c] to-[#003087] text-white p-3 rounded-[16px] shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    {isStreaming ? (
                      <Square className="w-5 h-5" fill="currentColor" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
