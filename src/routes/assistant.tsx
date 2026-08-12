import { createFileRoute } from "@tanstack/react-router";
import { Bot, Send, Trash2, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { getCrop, localizePlace, localizedAnswer } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useProfile } from "@/lib/store";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Krushi AI — Your Intelligent Farming Assistant | KrushiSetu AI" },
      {
        name: "description",
        content:
          "Ask Krushi AI about irrigation, fertilizer, pests, harvesting and government schemes and get clear farmer-friendly answers.",
      },
      { property: "og:title", content: "Krushi AI — Intelligent Farming Assistant" },
      {
        property: "og:description",
        content: "Chat with an AI farming assistant built for Indian farmers.",
      },
    ],
  }),
  component: Assistant,
});

interface Msg {
  role: "user" | "ai";
  text: string;
}

const SUGGESTION_KEYS = ["sug1", "sug2", "sug3", "sug4"];

function Assistant() {
  const { t, lang } = useI18n();
  const { profile } = useProfile();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;
    setInput("");
    setError("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      const prefix = profile
        ? t("aiPrefix", {
            land: profile.land,
            crop: getCrop(lang, profile.crop).name,
            district: localizePlace(lang, profile.district),
            state: localizePlace(lang, profile.state),
          })
        : "";
      setMessages((m) => [...m, { role: "ai", text: prefix + localizedAnswer(lang, q) }]);
    } catch {
      setError(t("aiError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Bot className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{t("krushiAI")}</h1>
            <p className="text-sm text-muted-foreground">{t("assistantSubtitle")}</p>
          </div>
          <span className="ml-auto rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            {t("demoMode")}
          </span>
        </div>

        <div className="card-soft mt-6 flex h-[60vh] min-h-96 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.length === 0 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
{t("suggestionsIntro")}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {SUGGESTION_KEYS.map((k) => (
                    // eslint-disable-next-line react/jsx-key
                    ((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void send(s)}
                      className="rounded-2xl border border-border bg-background p-3 text-left text-sm hover:bg-accent"
                    >
                      {s}
                    </button>
                  ))(t(k)))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "ai" && (
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                    <Bot className="h-4 w-4" />
                  </span>
                )}
                <p
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.text}
                </p>
                {m.role === "user" && (
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted">
                    <User className="h-4 w-4" />
                  </span>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Bot className="h-4 w-4" />
                </span>
                <span className="flex gap-1">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </span>
              </div>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2 border-t border-border p-4"
          >
            <button
              type="button"
              onClick={() => {
                setMessages([]);
                setError("");
              }}
              aria-label={t("clearChat")}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground hover:bg-accent"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("askPlaceholder")}
              className="h-11 flex-1 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
            />
            <button
              type="submit"
              disabled={loading}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground disabled:opacity-50"
              aria-label={t("send")}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
{t("demoModeNote")}
        </p>
      </div>
    </AppLayout>
  );
}
