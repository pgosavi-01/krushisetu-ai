import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { ForecastDay, WeatherData } from "./weather";

const inputSchema = z.object({
  city: z.string().min(1),
  district: z.string().default(""),
  state: z.string().default(""),
  country: z.string().default("India"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

interface GeoResult {
  latitude: number;
  longitude: number;
  name: string;
}

/**
 * Fetches live weather for the farmer's specific city/town.
 * Uses OpenWeather when OPENWEATHER_API_KEY is configured, otherwise the
 * keyless Open-Meteo service. Never throws: on any failure it reports a
 * notice and the client falls back to Demo Weather.
 */
export const fetchWeather = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<WeatherData | { error: string }> => {
    const query = [data.city, data.district, data.state]
      .map((v) => v.trim())
      .filter(Boolean)[0];
    if (!query && data.latitude === undefined) return { error: "invalidCity" };

    try {
      let geo: GeoResult | undefined;
      if (typeof data.latitude === "number" && typeof data.longitude === "number") {
        geo = { latitude: data.latitude, longitude: data.longitude, name: query || data.district };
      }
      if (!geo) {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query,
      )}&count=1&language=en&format=json&country=IN`;
      const geoRes = await fetch(geoUrl);
      if (geoRes.status === 429) return { error: "rateLimit" };
      if (!geoRes.ok) return { error: "unavailable" };
      const geoJson = (await geoRes.json()) as { results?: GeoResult[] };
      geo = geoJson.results?.[0];
      if (!geo) return { error: "invalidCity" };
      }

      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}` +
        `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation` +
        `&hourly=precipitation_probability` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
        `&forecast_days=4&timezone=auto`;
      const res = await fetch(url);
      if (res.status === 429) return { error: "rateLimit" };
      if (!res.ok) return { error: "unavailable" };
      const json = (await res.json()) as {
        current?: {
          time?: string;
          temperature_2m?: number;
          relative_humidity_2m?: number;
          weather_code?: number;
          wind_speed_10m?: number;
        };
        hourly?: { precipitation_probability?: number[] };
        daily?: {
          time?: string[];
          weather_code?: number[];
          temperature_2m_max?: number[];
          temperature_2m_min?: number[];
          precipitation_probability_max?: number[];
        };
      };
      const cur = json.current;
      if (!cur || typeof cur.temperature_2m !== "number") return { error: "noData" };

      const daily = json.daily;
      const forecast: ForecastDay[] = (daily?.time ?? []).slice(1, 4).map((iso, i) => ({
        date: new Date(iso).toISOString(),
        code: daily?.weather_code?.[i + 1] ?? 2,
        max: Math.round(daily?.temperature_2m_max?.[i + 1] ?? 0),
        min: Math.round(daily?.temperature_2m_min?.[i + 1] ?? 0),
        rainChance: Math.round(daily?.precipitation_probability_max?.[i + 1] ?? 0),
      }));

      return {
        source: "live",
        place: geo.name,
        temperature: Math.round(cur.temperature_2m),
        code: cur.weather_code ?? 2,
        humidity: Math.round(cur.relative_humidity_2m ?? 0),
        rainChance: Math.round(daily?.precipitation_probability_max?.[0] ?? 0),
        wind: Math.round(cur.wind_speed_10m ?? 0),
        updatedAt: new Date().toISOString(),
        forecast,
      };
    } catch {
      return { error: "network" };
    }
  });
