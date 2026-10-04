"use client";

import { useEffect, useRef, useState } from "react";
import MessageBubble, { BotIcon } from "../components/MessageBubble";
import TypingIndicator from "../components/TypingIndicator";
import { useChatWithAi, useGetAiChats } from "../hooks/hooks";
import { Compass, Luggage, Utensils, Wallet } from "lucide-react";

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74Z" />
  </svg>
);

const AddIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const SUGGESTED_PROMPTS = [
  { icon: Compass, text: "Suggest a 3-day Paris itinerary" },
  { icon: Luggage, text: "Beach vacation packing checklist" },
  { icon: Utensils, text: "Must-try local foods in Tokyo" },
  { icon: Wallet, text: "Budget breakdown for 5 days in Bali" },
];

export default function ChatAssistant() {
  const { data, isLoading: aiLoading } = useGetAiChats();
  const { mutateAsync: chatWithAi, isPending: chatLoading } = useChatWithAi();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (data?.data?.chats) {
      setMessages(data.data.chats);
    }
  }, [data]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, chatLoading]);

  const handleInput = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 128) + "px";
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || chatLoading) return;

    const tempId = `temp-${Date.now()}`;
    const userMessage = {
      id: tempId,
      role: "user",
      content: trimmed,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const response = await chatWithAi({
        message: trimmed,
      });

      if (response?.data?.chat) {
        setMessages((previous) => [...previous, response.data.chat]);
      }
    } catch (error) {
      console.error("AI chat failed:", error);
      setMessages((previous) =>
        previous.map((message) =>
          message.id === tempId
            ? {
                ...message,
                failed: true,
              }
            : message,
        ),
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  if (aiLoading) {
    return (
      <div className="ml-0 lg:ml-64 pt-16 lg:pt-0 flex h-[calc(100vh-4rem)] lg:h-screen items-center justify-center bg-[#f7faf6] p-6 text-[#6f7a74] text-sm font-semibold">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#005440]/10 border border-[#005440]/20 flex items-center justify-center animate-spin">
            <BotIcon />
          </div>
          <span>Loading conversation history...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="ml-0 lg:ml-64 pt-16 lg:pt-0 flex flex-col h-[calc(100vh-4rem)] lg:h-screen bg-[#f7faf6] relative overflow-hidden">
      {/* Header */}
      <header className="px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between border-b border-[#bec9c3]/20 bg-white/80 backdrop-blur-md z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#005440]/10 border border-[#005440]/20 flex items-center justify-center shrink-0">
            <BotIcon />
          </div>
          <div>
            <h1 className="font-headline text-base sm:text-lg font-bold text-[#005440] tracking-tight">AI Travel Assistant</h1>
            <p className="text-xs text-[#6f7a74]">Powered by Voymate</p>
          </div>
        </div>
      </header>

      {/* Messages Feed */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-8 hide-scrollbar">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {messages.length === 0 ? (
            <div className="py-12 sm:py-16 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#005440]/10 border border-[#005440]/20 flex items-center justify-center text-[#005440] mb-5 shadow-xs">
                <BotIcon />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#181d1a] font-headline mb-2">How can I help with your trip today?</h2>
              <p className="text-xs sm:text-sm text-[#6f7a74] max-w-md mb-8 leading-relaxed">
                Ask me anything about destination guides, custom itineraries, packing lists, or travel budget estimates.
              </p>

              {/* Quick Prompt Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl text-left">
                {SUGGESTED_PROMPTS.map((promptItem, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => send(promptItem.text)}
                    className="p-3.5 rounded-xl bg-white border border-[#bec9c3]/20 hover:border-[#005440]/40 hover:shadow-xs text-xs sm:text-sm font-semibold text-[#181d1a] transition-all active:scale-95 text-left flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#eef8f4] flex items-center justify-center text-[#0f6e56] group-hover:bg-[#005440] group-hover:text-white transition-colors shrink-0">
                      <promptItem.icon className="w-4 h-4" />
                    </div>
                    <span>{promptItem.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((chat) => (
              <MessageBubble key={chat.id} chat={chat} onSuggestion={(suggestion) => send(suggestion)} />
            ))
          )}

          {/* AI Thinking Indicator */}
          {chatLoading && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Fixed Bottom Input Bar */}
      <div className="p-3 sm:p-4 bg-gradient-to-t from-[#f7faf6] via-[#f7faf6] to-transparent shrink-0 border-t border-[#bec9c3]/15 z-20">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-2xl p-2 sm:p-2.5 flex items-end shadow-md border border-[#bec9c3]/30 focus-within:border-[#005440] focus-within:ring-2 focus-within:ring-[#005440]/10 transition-all">
            <button type="button" aria-label="Attach file" title="Attach file" className="p-2 sm:p-2.5 text-[#6f7a74] hover:text-[#005440] hover:bg-[#f1f4f1] rounded-xl transition-colors shrink-0 mb-0.5">
              <AddIcon />
            </button>

            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                handleInput();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask about travel, itineraries, or tips…"
              className="w-full bg-transparent border-none outline-none resize-none max-h-32 py-2 px-2 sm:px-3 text-base sm:text-sm text-[#181d1a] placeholder:text-[#9ca8a3] placeholder:truncate focus:ring-0 leading-snug min-w-0"
            />

            <button
              type="button"
              onClick={() => send(input)}
              disabled={!input.trim() || chatLoading}
              aria-label="Send message"
              title="Send message"
              className="h-10 w-10 sm:h-11 sm:w-11 bg-[#005440] hover:bg-[#004030] text-white rounded-xl transition-all flex items-center justify-center shrink-0 ml-1.5 mb-0.5 shadow-xs active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#005440]"
            >
              <SendIcon />
            </button>
          </div>

          <p className="text-center text-[10px] text-[#6f7a74]/70 mt-2">AI Assistant can make mistakes. Verify important travel details.</p>
        </div>
      </div>
    </section>
  );
}
