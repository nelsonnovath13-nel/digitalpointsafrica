import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { buildWhatsAppLink } from "../lib/wa";

const AVATAR_URL = "/images/support-agent.jpg";
const AGENT_NAME = "Digital Points";

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;
    window.open(buildWhatsAppLink(null, text), "_blank", "noreferrer");
    setMessage("");
  };

  return (
    <>
      <div
        className={`fixed bottom-24 right-5 z-50 w-[320px] origin-bottom-right overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-6 sm:w-[340px] ${
          isOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
        role="dialog"
        aria-hidden={!isOpen}
        aria-label="Chat with Digital Points"
      >
        <div className="flex items-center gap-3 bg-[#08bdb8] px-4 py-3.5">
          <img src={AVATAR_URL} alt={AGENT_NAME} className="h-9 w-9 rounded-full border border-white/40 object-cover" />
          <span className="font-display text-[15px] font-semibold text-white">{AGENT_NAME}</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[260px] overflow-y-auto px-4 py-4">
          <div className="flex items-end gap-2">
            <img src={AVATAR_URL} alt="" aria-hidden="true" className="h-6 w-6 shrink-0 rounded-full object-cover" />
            <div className="rounded-2xl rounded-bl-sm bg-[#f1f1ef] px-3.5 py-2.5 text-[13.5px] leading-snug text-ink-950/85">
              Hey there 👋 How can we help grow your brand today?
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-ink-950/10 px-3 py-3">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type your message…"
            className="min-w-0 flex-1 bg-transparent text-[13.5px] text-ink-950 placeholder:text-ink-950/40 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send on WhatsApp"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#08bdb8] text-white transition hover:bg-[#0aa9a5]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label={isOpen ? "Close chat" : "Chat with us"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#08bdb8] text-white shadow-[0_10px_30px_rgba(8,189,184,0.45)] transition-transform hover:scale-105 sm:right-6"
      >
        {isOpen ? (
          <span aria-hidden="true" className="text-2xl leading-none">✕</span>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-7 w-7">
            <path d="M12 2C6.48 2 2 6.03 2 11c0 2.4 1.1 4.58 2.9 6.19L4 22l5.05-1.87C10.24 20.7 11.1 20 12 20c5.52 0 10-4.03 10-9S17.52 2 12 2Z" />
          </svg>
        )}
      </button>
    </>
  );
}

export function GetInTouchTab() {
  return (
    <div className="fixed bottom-5 left-0 z-40">
      <Link
        to="/contact"
        aria-label="Get In Touch"
        className="get-in-touch-tab group flex h-11 w-11 items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-r-full bg-[#08bdb8] pl-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink-950 transition-[width] duration-300 ease-out hover:w-[185px]"
      >
        <span aria-hidden="true" className="get-in-touch-dot h-2 w-2 shrink-0 rounded-full bg-white" />
        <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">Get In Touch</span>
      </Link>
      <style>{`
        .get-in-touch-tab {
          animation: get-in-touch-glow 2.4s ease-in-out infinite;
        }
        .get-in-touch-dot {
          animation: get-in-touch-dot-blink 1.2s ease-in-out infinite;
        }
        @keyframes get-in-touch-glow {
          0%, 100% { box-shadow: 0 8px 22px rgba(0,0,0,0.3), 0 0 0 0 rgba(255,255,255,0); }
          50% { box-shadow: 0 8px 22px rgba(0,0,0,0.3), 0 0 16px 4px rgba(255,255,255,0.55); }
        }
        @keyframes get-in-touch-dot-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .get-in-touch-tab, .get-in-touch-dot { animation: none; }
        }
      `}</style>
    </div>
  );
}
