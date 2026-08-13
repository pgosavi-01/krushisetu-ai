import { Droplets, Info, MapPin, RefreshCw, Wind } from "lucide-react";
import { formatLongDate, formatShortDate, formatTime } from "@/lib/date";
import { localizePlace } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import type { FarmerProfile } from "@/lib/store";
import {
  CONDITION_EMOJI,
  conditionKey,
  weatherTipKeys,
  type WeatherData,
} from "@/lib/weather";

interface Props {
  profile: FarmerProfile;
  weather: WeatherData | null;
  loading: boolean;
  onRefresh: () => void;
}

export function WeatherCard({ profile, weather, loading, onRefresh }: Props) {
  const { t, lang } = useI18n();
  const cityL = localizePlace(lang, profile.city || profile.district);
  const districtL = localizePlace(lang, profile.district);
  const stateL = localizePlace(lang, profile.state);

  return (
    <section className="card-soft p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">🌦️ {t("farmWeather")}</h2>
          <p className="mt-1 flex items-center gap-1 text-sm font-medium">
            <MapPin className="h-4 w-4 text-primary" /> {cityL}, {districtL}
          </p>
          <p className="text-xs text-muted-foreground">{stateL}, India</p>
          <p className="mt-1 text-xs text-muted-foreground">📅 {formatLongDate(lang)}</p>
        </div>
        <div className="flex items-center gap-2">
          {weather && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                weather.source === "live"
                  ? "bg-primary/12 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {weather.source === "live" ? t("liveWeather") : t("demoWeather")}
            </span>
          )}
          <button
            type="button"
            onClick={onRefresh}
            aria-label={t("refreshWeather")}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:bg-accent"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {!weather ? (
        <p className="mt-6 text-sm text-muted-foreground">{t("weatherLoading")}</p>
      ) : (
        <>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="text-5xl leading-none">{CONDITION_EMOJI[conditionKey(weather.code)]}</span>
            <div>
              <p className="text-4xl font-bold">{weather.temperature}°C</p>
              <p className="text-sm text-muted-foreground">
                {t(`cond${conditionKey(weather.code)}`)}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-3 text-sm">
              <p className="flex items-center gap-1.5 text-muted-foreground">
                <Droplets className="h-4 w-4" /> {t("humidity")}
              </p>
              <p className="mt-1 text-lg font-semibold">{weather.humidity}%</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-3 text-sm">
              <p className="flex items-center gap-1.5 text-muted-foreground">
                🌧️ {t("rainChance")}
              </p>
              <p className="mt-1 text-lg font-semibold">{weather.rainChance}%</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-3 text-sm">
              <p className="flex items-center gap-1.5 text-muted-foreground">
                <Wind className="h-4 w-4" /> {t("wind")}
              </p>
              <p className="mt-1 text-lg font-semibold">
                {weather.wind} {t("kmh")}
              </p>
            </div>
          </div>

          {weather.forecast.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("forecast")}
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {weather.forecast.map((d) => (
                  <div
                    key={d.date}
                    className="flex items-center gap-2 rounded-2xl border border-border bg-background p-3 text-sm"
                  >
                    <span className="text-xl">{CONDITION_EMOJI[conditionKey(d.code)]}</span>
                    <div>
                      <p className="font-medium">{formatShortDate(lang, new Date(d.date))}</p>
                      <p className="text-xs text-muted-foreground">
                        {d.max}° / {d.min}° · 🌧️ {d.rainChance}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 rounded-2xl bg-accent p-4 text-sm text-accent-foreground">
            <p className="font-semibold">🌱 {t("smartTip")}</p>
            <ul className="mt-2 space-y-1.5">
              {weatherTipKeys(weather).map((k) => (
                <li key={k}>• {t(k)}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>
              {t("lastUpdated")}: {formatTime(lang, new Date(weather.updatedAt))}
            </span>
            {weather.notice && (
              <span className="flex items-center gap-1">
                <Info className="h-3.5 w-3.5" />
                {t(`notice${weather.notice.charAt(0).toUpperCase()}${weather.notice.slice(1)}`)}
              </span>
            )}
          </div>
          {weather.source === "demo" && (
            <p className="mt-2 text-xs text-muted-foreground">{t("demoWeatherNote")}</p>
          )}
        </>
      )}
    </section>
  );
}
