import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Bell, Bot, ClipboardList, Landmark, Sprout, Sun } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { WeatherCard } from "@/components/WeatherCard";
import { matchSchemes } from "@/lib/data";
import { getCrop, localizePlace, localizedAdvice } from "@/lib/content";
import { formatLongDate, toDateKey } from "@/lib/date";
import { useI18n } from "@/lib/i18n";
import { REMINDER_EMOJI, useProfile, useReminders, useTasks } from "@/lib/store";
import { conditionKey, todayActionKeys, type WeatherData } from "@/lib/weather";
import { useWeather } from "@/lib/useWeather";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Farm Dashboard — KrushiSetu AI" },
      {
        name: "description",
        content:
          "A personalized farm dashboard with live local weather, today's farming advice, reminders and matching government schemes.",
      },
      { property: "og:title", content: "Your Farm Dashboard — KrushiSetu AI" },
      {
        property: "og:description",
        content: "Daily personalized farming advice, weather and farm progress at a glance.",
      },
    ],
  }),
  component: Dashboard,
});

/** Informational weather notices tied to today's reminders. */
function weatherAwareKeys(
  weather: WeatherData | null,
  categories: string[],
): string[] {
  if (!weather) return [];
  const keys: string[] = [];
  const cond = conditionKey(weather.code);
  const wet = weather.rainChance >= 50 || cond === "rain" || cond === "heavyRain" || cond === "thunder";
  const irrigation = categories.includes("irrigation");
  if (irrigation && wet) keys.push("weatherAwareRain");
  if (irrigation && weather.temperature >= 33) keys.push("weatherAwareHeat");
  if ((categories.includes("inspection") || categories.includes("pest")) && weather.humidity >= 75) {
    keys.push("weatherAwareHumidity");
  }
  return keys;
}

function Dashboard() {
  const { t, lang } = useI18n();
  const { profile, loaded } = useProfile();
  const { tasks } = useTasks();
  const { reminders } = useReminders();
  const { weather, loading, refresh } = useWeather(profile);

  if (loaded && !profile) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold">{t("needProfileTitle")}</h1>
          <p className="mt-2 text-muted-foreground">{t("needProfileText")}</p>
          <Link
            to="/profile"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
          >
            {t("getStarted")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </AppLayout>
    );
  }

  if (!profile) return <AppLayout><div className="h-64" /></AppLayout>;

  const crop = getCrop(lang, profile.crop);
  const schemes = matchSchemes(profile);
  const done = tasks.filter((x) => x.done).length;
  const advice = localizedAdvice(lang, profile.crop, profile.season, profile.city || profile.district);
  const cityL = localizePlace(lang, profile.city || profile.district);
  const districtL = localizePlace(lang, profile.district);
  const stateL = localizePlace(lang, profile.state);
  const seasonL = localizePlace(lang, profile.season);

  const todayKey = toDateKey();
  const todaysReminders = reminders.filter((r) => r.date === todayKey);
  const notices = weatherAwareKeys(
    weather,
    todaysReminders.filter((r) => !r.done).map((r) => r.category),
  );
  const actions = weather ? todayActionKeys(weather) : [];

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("goodMorning")}, {profile.name} 👨‍🌾
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">📅 {formatLongDate(lang)}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          {[
            `📍 ${cityL}, ${districtL}, ${stateL}`,
            `📐 ${profile.land} ${t("hectares")}`,
            `${crop.emoji} ${crop.name}`,
            `🌾 ${seasonL}`,
          ].map((chip) => (
            <span key={chip} className="rounded-full border border-border bg-card px-3 py-1.5">
              {chip}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card-soft p-5">
            <Sprout className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("cropStatus")}
            </p>
            <p className="mt-1 text-2xl font-bold text-primary">{t("good")}</p>
            <p className="text-xs text-muted-foreground">{crop.name} · {seasonL}</p>
          </div>

          <Link to="/planner" className="card-soft p-5 transition-all hover:-translate-y-1 hover:shadow-card">
            <ClipboardList className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("todaysTasks")}
            </p>
            <p className="mt-1 text-2xl font-bold">
              {done} / {tasks.length}
            </p>
            <p className="text-xs text-muted-foreground">{tasks.length - done} {t("remaining")}</p>
          </Link>

          <Link to="/schemes" className="card-soft p-5 transition-all hover:-translate-y-1 hover:shadow-card">
            <Landmark className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("relevantSchemes")}
            </p>
            <p className="mt-1 text-2xl font-bold">{schemes.length}</p>
            <p className="text-xs text-muted-foreground">{t("potentiallySuitableLower")}</p>
          </Link>

          <Link to="/assistant" className="card-soft p-5 transition-all hover:-translate-y-1 hover:shadow-card">
            <Bot className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("aiAssistant")}
            </p>
            <p className="mt-1 text-lg font-bold">{t("askAI")}</p>
            <p className="text-xs text-muted-foreground">{t("answersInSeconds")}</p>
          </Link>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <WeatherCard profile={profile} weather={weather} loading={loading} onRefresh={() => void refresh()} />
          </div>

          <section className="card-soft p-6">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">{t("todaysReminders")}</h2>
            </div>

            {notices.map((k) => (
              <div
                key={k}
                className="mt-4 flex gap-3 rounded-2xl border border-border bg-accent p-4 text-sm text-accent-foreground"
              >
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <div>
                  <p className="font-semibold">⚠️ {t("weatherAware")}</p>
                  <p className="mt-1">{t(k)}</p>
                </div>
              </div>
            ))}

            <ul className="mt-4 space-y-2">
              {todaysReminders.map((r) => (
                <li
                  key={r.id}
                  className="rounded-2xl border border-border bg-background p-3 text-sm"
                >
                  <p className={r.done ? "text-muted-foreground line-through" : "font-medium"}>
                    {REMINDER_EMOJI[r.category]} {r.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {r.time ? `${r.time} · ` : ""}
                    {t(`cat${r.category}`)}
                  </p>
                </li>
              ))}
              {todaysReminders.length === 0 && (
                <li className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  {t("noRemindersToday")}
                </li>
              )}
            </ul>
            <Link
              to="/planner"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              {t("addReminder")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="gradient-hero rounded-3xl p-6 text-primary-foreground shadow-card sm:p-8 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              <h2 className="text-xl font-bold">🌱 {t("whatToday")}</h2>
            </div>
            <p className="mt-1 text-sm opacity-85">
              📍 {cityL} · {crop.emoji} {crop.name} · 🌾 {seasonL}
              {weather ? ` · ${t(`cond${conditionKey(weather.code)}`)} ${weather.temperature}°C` : ""}
            </p>
            <ul className="mt-5 space-y-3">
              {(actions.length
                ? actions.map((k) => t(k, { crop: crop.name }))
                : advice
              ).map((a, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-2xl bg-primary-foreground/12 p-4 text-sm leading-relaxed"
                >
                  <span className="font-bold opacity-80">{i + 1}.</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/planner"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-card px-5 text-sm font-semibold text-primary"
              >
                {t("openPlanner")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/schemes"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-primary-foreground/40 px-5 text-sm font-semibold"
              >
                {t("openSchemes")}
              </Link>
              <Link
                to="/assistant"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-primary-foreground/40 px-5 text-sm font-semibold"
              >
                {t("openAI")}
              </Link>
            </div>
          </section>

          <section className="card-soft p-6">
            <h2 className="text-lg font-bold">{t("todaysAdvice")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {crop.name} · {t("cropNotes")}
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-2xl border border-border bg-background p-4">
                <p className="font-semibold">💧 {t("irrigationLabel")}</p>
                <p className="mt-1 text-muted-foreground">{crop.irrigation}</p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-4">
                <p className="font-semibold">🐛 {t("pestWatch")}</p>
                <p className="mt-1 text-muted-foreground">{crop.pest}</p>
              </div>
            </div>
            <Link
              to="/crops"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              {t("fullCropGuide")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
