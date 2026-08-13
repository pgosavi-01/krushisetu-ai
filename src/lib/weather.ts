/** Shared weather types + demo fallback + farming tip logic (browser-safe). */

import type { CropKey } from "./data";
import type { Lang } from "./i18n";

export type WeatherSource = "live" | "demo";

export interface ForecastDay {
  /** ISO date string */
  date: string;
  code: number;
  max: number;
  min: number;
  rainChance: number;
}

export interface WeatherData {
  source: WeatherSource;
  /** Resolved place label, e.g. "Sinnar" */
  place: string;
  temperature: number;
  code: number;
  humidity: number;
  rainChance: number;
  wind: number;
  /** ISO timestamp of the observation/fetch */
  updatedAt: string;
  forecast: ForecastDay[];
  /** Reason a live fetch failed, if any */
  notice?: WeatherNotice;
}

export type WeatherNotice =
  | "network"
  | "unavailable"
  | "invalidCity"
  | "rateLimit"
  | "noData"
  | "missingKey";

/** WMO weather codes grouped into a small set of translatable conditions. */
export type ConditionKey =
  | "clear"
  | "partlyCloudy"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "heavyRain"
  | "thunder";

export function conditionKey(code: number): ConditionKey {
  if (code === 0) return "clear";
  if (code === 1 || code === 2) return "partlyCloudy";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 67) return code >= 65 ? "heavyRain" : "rain";
  if (code >= 80 && code <= 82) return code >= 82 ? "heavyRain" : "rain";
  if (code >= 95) return "thunder";
  if (code >= 71 && code <= 77) return "cloudy";
  return "cloudy";
}

export const CONDITION_EMOJI: Record<ConditionKey, string> = {
  clear: "☀️",
  partlyCloudy: "⛅",
  cloudy: "☁️",
  fog: "🌫️",
  drizzle: "🌦️",
  rain: "🌧️",
  heavyRain: "⛈️",
  thunder: "⛈️",
};

/** Deterministic-ish demo weather so the dashboard never looks broken. */
export function demoWeather(place: string, notice?: WeatherNotice): WeatherData {
  const now = new Date();
  const seed = (place.length * 7 + now.getDate() * 3) % 5;
  const codes = [1, 2, 3, 61, 80];
  const code = codes[seed] ?? 2;
  const base = 26 + seed;
  const forecast: ForecastDay[] = Array.from({ length: 3 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() + i + 1);
    return {
      date: d.toISOString(),
      code: codes[(seed + i + 1) % codes.length] ?? 2,
      max: base + 2 + i,
      min: base - 8 + i,
      rainChance: [30, 55, 20][(seed + i) % 3] ?? 30,
    };
  });
  return {
    source: "demo",
    place,
    temperature: base,
    code,
    humidity: 60 + seed * 4,
    rainChance: [20, 40, 25, 70, 60][seed] ?? 40,
    wind: 8 + seed * 3,
    updatedAt: now.toISOString(),
    forecast,
    ...(notice ? { notice } : {}),
  };
}

/* ---------------- Smart farming tips ---------------- */

export type TipKey =
  | "tipRain"
  | "tipHeat"
  | "tipHumidity"
  | "tipWind"
  | "tipClear"
  | "tipCool";

/** Weather + crop + season → cautious, informational tip keys. */
export function weatherTipKeys(w: WeatherData): TipKey[] {
  const keys: TipKey[] = [];
  const cond = conditionKey(w.code);
  if (w.rainChance >= 50 || cond === "rain" || cond === "heavyRain" || cond === "thunder") {
    keys.push("tipRain");
  }
  if (w.temperature >= 33) keys.push("tipHeat");
  if (w.humidity >= 75) keys.push("tipHumidity");
  if (w.wind >= 25) keys.push("tipWind");
  if (keys.length === 0) {
    keys.push(w.temperature <= 18 ? "tipCool" : "tipClear");
  }
  return keys.slice(0, 3);
}

/** Actionable "what should I do today" suggestion keys from weather + crop + season. */
export function todayActionKeys(w: WeatherData): string[] {
  const cond = conditionKey(w.code);
  const wet = w.rainChance >= 50 || cond === "rain" || cond === "heavyRain" || cond === "thunder";
  const keys = ["actSoil"];
  if (wet) keys.push("actDrainage");
  else keys.push("actIrrigation");
  if (w.humidity >= 70) keys.push("actDisease");
  else keys.push("actInspect");
  keys.push("actReminders");
  return keys;
}

export interface TipContext {
  lang: Lang;
  crop: CropKey;
  cropName: string;
  season: string;
  place: string;
}
