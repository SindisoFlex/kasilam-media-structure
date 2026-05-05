import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };
const MAX_HISTORY_MESSAGES = 20;
const SAFE_FALLBACK_MESSAGE =
  "You're in the right place, and we can still help. You can message us on WhatsApp at +27659704101 for direct assistance.";

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm KMP's assistant. Ask me about our photography, video, audio or web services — or how to book.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }] as Msg[];
    setInput("");
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(-MAX_HISTORY_MESSAGES),
        }),
      });

      const raw = await res.text();
      let data: any = {};
      try { data = raw ? JSON.parse(raw) : {}; } catch {
        console.error("[AIChatWidget] Non-JSON response:", res.status, raw.slice(0, 300));
      }

      if (!res.ok || typeof data?.reply !== "string" || !data.reply.trim()) {
        if (!res.ok) {
          console.error("[AIChatWidget] HTTP error", res.status, data);
        } else {
          console.error("[AIChatWidget] Missing 'reply' in response:", data);
        }
        setMessages((m) => [...m, { role: "assistant", content: SAFE_FALLBACK_MESSAGE }]);
        return;
      }

      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("[AIChatWidget] Network error:", err);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: SAFE_FALLBACK_MESSAGE },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed bottom-5 right-5 z-[60] h-14 w-14 rounded-full bg-primary text-primary-foreground",
          "shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] flex items-center justify-center",
          "transition-all hover:scale-105 active:scale-95"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed z-[60] bg-background border border-foreground/10 shadow-2xl",
          "flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right",
          "bottom-24 right-5 w-[calc(100vw-2.5rem)] max-w-[400px] h-[70vh] max-h-[600px] rounded-2xl",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
        role="dialog"
        aria-label="KMP AI chat"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-foreground/10 bg-foreground/[0.03] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">KMP Assistant</p>
            <p className="text-sm font-bold mt-0.5">Ask anything about our services</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-foreground/60 hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-foreground/5 text-foreground rounded-bl-sm"
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-foreground/5 rounded-2xl rounded-bl-sm px-4 py-2.5">
                <Loader2 className="h-4 w-4 animate-spin text-foreground/60" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-foreground/10 p-3 bg-background">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              rows={1}
              placeholder="Type your message..."
              className={cn(
                "flex-1 resize-none bg-foreground/5 rounded-xl px-4 py-3 text-sm",
                "outline-none focus:ring-2 focus:ring-primary/40 max-h-32"
              )}
            />
            <Button
              onClick={send}
              disabled={loading || !input.trim()}
              size="icon"
              className="h-11 w-11 rounded-xl shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-[10px] text-foreground/40 text-center">
            Powered by KMP AI · Replies may be inaccurate
          </p>
        </div>
      </div>
    </>
  );
};

export default AIChatWidget;
