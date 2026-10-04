import { AssistantChat } from "../interfaces/interfaces";
import FormattedMessage from "./FormattedMessage";

export const BotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#005440]">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);

export default function MessageBubble({ chat, userAvatar, suggestions, onSuggestion }: { chat: AssistantChat; userAvatar?: string; suggestions?: string[]; onSuggestion?: (s: string) => void }) {
  const isUser = chat.role === "user";

  if (isUser) {
    return (
      <div className="w-full flex justify-end">
        <div className="flex gap-2.5 max-w-[88%] sm:max-w-[75%] flex-row-reverse items-end">
          <div className="flex flex-col gap-1 items-end">
            <span className="font-headline text-[10px] font-bold text-[#6f7a74] mr-1">You</span>
            <div className="bg-[#005440] text-white p-3.5 sm:p-4 rounded-2xl rounded-tr-xs text-sm leading-relaxed shadow-xs">
              {chat.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start">
      <div className="flex items-start gap-2.5 sm:gap-3 max-w-[92%] sm:max-w-[85%]">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#005440]/10 border border-[#005440]/20 flex items-center justify-center shrink-0 mt-0.5">
          <BotIcon />
        </div>
        <div className="flex flex-col gap-1.5 min-w-0">
          <span className="font-headline text-[10px] font-bold text-[#6f7a74] ml-1">AI Travel Assistant</span>
          <div className="bg-white p-4 sm:p-5 rounded-2xl rounded-tl-xs border border-[#bec9c3]/20 text-[#181d1a] shadow-xs">
            <FormattedMessage content={chat.content} />
          </div>
          {suggestions && suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => onSuggestion?.(s)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#005440]/10 text-[#005440] hover:bg-[#005440]/20 border border-[#005440]/20 transition-all active:scale-95 text-left"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
