import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState } from "react";
import { fetchWeather } from "./weather.functions";
import { demoWeather, type WeatherData, type WeatherNotice } from "./weather";
import type { FarmerProfile } from "./store";

/** Loads live weather for the farmer's city/town, with a demo fallback. */
export function useWeather(profile: FarmerProfile | null) {
  const call = useServerFn(fetchWeather);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const place = profile ? profile.city || profile.district : "";

  const load = useCallback(async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const result = await call({
        data: {
          city: profile.city || profile.district,
          district: profile.district,
          state: profile.state,
          country: "India",
        },
      });
      if (result && "error" in result) {
        setWeather(demoWeather(place, result.error as WeatherNotice));
      } else {
        setWeather(result as WeatherData);
      }
    } catch {
      setWeather(demoWeather(place, "network"));
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.city, profile?.district, profile?.state, place]);

  useEffect(() => {
    void load();
  }, [load]);

  return { weather, loading, refresh: load };
}
