import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, ClipboardList, Landmark, Leaf, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-farm.jpg";
import { AppLayout } from "@/components/AppLayout";
import { LogoMark } from "@/components/Logo";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KrushiSetu AI — Smart Farming Guidance for Indian Farmers" },
      {
        name: "description",
        content:
          "KrushiSetu AI gives Indian farmers personalized crop guidance, government scheme matching and an AI farming assistant in English, Marathi and Hindi.",
      },
      { property: "og:title", content: "KrushiSetu AI — Smart Farming. Local Guidance." },
      {
        property: "og:description",
        content:
          "Personalized crop guidance, government scheme discovery and AI assistance for Indian farmers.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: Leaf,
    emoji: "🌱",
    title: "Crop Guidance",
    text: "Sowing, irrigation, fertilizer, pest and harvest advice for six major crops in plain language.",
    to: "/crops" as const,
  },
  {
    icon: Landmark,
    emoji: "🏛️",
    title: "Government Schemes",
    text: "Discover schemes that may suit your land size, state and crop, with documents and benefits.",
    to: "/schemes" as const,
  },
  {
    icon: Bot,
    emoji: "🤖",
    title: "Krushi AI",
    text: "Ask farming questions any time and get clear, farmer-friendly answers instantly.",
    to: "/assistant" as const,
  },
  {
    icon: ClipboardList,
    emoji: "📋",
    title: "Smart Farm Planner",
    text: "Plan the day's field tasks, tick them off and track your progress through the season.",
    to: "/planner" as const,
  },
];

function Landing() {
  const { t } = useI18n();

  return (
    <AppLayout>
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="Green Indian farmland at sunrise with rows of onion crop"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
          <div className="max-w-2xl text-primary-foreground">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t("brand")}
            </h1>
            <p className="mt-4 text-lg font-medium opacity-95 sm:text-xl">{t("tagline")}</p>
            <p className="mt-4 max-w-xl text-base opacity-85">
              KrushiSetu AI provides personalized agricultural guidance, government scheme discovery
              and AI-powered assistance so farmers can make confident decisions every single day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/profile"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-card px-6 text-sm font-semibold text-primary shadow-card transition-transform hover:-translate-y-0.5"
              >
                {t("getStarted")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/assistant"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-primary-foreground/40 px-6 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
              >
                <Bot className="h-4 w-4" /> {t("askAI")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Everything a farmer needs, in one place
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Built farmer-first: simple words, fewer taps, and guidance that changes with your crop and
          season.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="card-soft group p-6 transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-xl">
                {f.emoji}
              </span>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-card py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">How it works</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Create your profile",
                text: "Tell us your state, district, land size, crop and season. It takes under a minute.",
              },
              {
                step: "2",
                title: "Get personalized guidance",
                text: "Your dashboard shows today's advice, crop steps and schemes that may suit you.",
              },
              {
                step: "3",
                title: "Take action",
                text: "Plan field tasks, tick them off and ask Krushi AI whenever you are unsure.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-border bg-background p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {s.step}
                </span>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="gradient-hero rounded-3xl px-6 py-12 text-center text-primary-foreground shadow-card sm:px-12">
          <ShieldCheck className="mx-auto h-8 w-8 opacity-90" />
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Start farming with better decisions</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-90 sm:text-base">
            Set up your farmer profile once and KrushiSetu AI will personalize crop guidance, scheme
            matching and daily advice for your farm.
          </p>
          <Link
            to="/profile"
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-card px-7 text-sm font-semibold text-primary shadow-card"
          >
            {t("getStarted")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </AppLayout>
  );
}
