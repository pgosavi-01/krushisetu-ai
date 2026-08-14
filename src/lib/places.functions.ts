import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  query: z.string().min(1),
  state: z.string().default(""),
  district: z.string().default(""),
});

export interface PlaceResult {
  name: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
}

interface GeoRow {
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  admin2?: string;
  country_code?: string;
}

/** Searches Indian towns/cities, preferring results inside the chosen district. */
export const searchPlaces = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<PlaceResult[]> => {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        data.query,
      )}&count=25&language=en&format=json&countryCode=IN`;
      const res = await fetch(url);
      if (!res.ok) return [];
      const json = (await res.json()) as { results?: GeoRow[] };
      const rows = (json.results ?? []).filter((r) => (r.country_code ?? "IN") === "IN");

      const norm = (v: string) => v.toLowerCase().replace(/[^a-z]/g, "");
      const dist = norm(data.district);
      const state = norm(data.state);

      const scored = rows.map((r) => {
        const a1 = norm(r.admin1 ?? "");
        const a2 = norm(r.admin2 ?? "");
        let score = 0;
        if (dist && (a2.includes(dist) || dist.includes(a2)) && a2) score += 2;
        if (state && (a1.includes(state) || state.includes(a1)) && a1) score += 1;
        return { r, score };
      });

      const inDistrict = scored.filter((s) => s.score >= 2);
      const inState = scored.filter((s) => s.score === 1);
      const pick = inDistrict.length ? inDistrict : inState;

      return pick.slice(0, 12).map(({ r }) => ({
        name: r.name,
        district: r.admin2 ?? data.district,
        state: r.admin1 ?? data.state,
        latitude: r.latitude,
        longitude: r.longitude,
      }));
    } catch {
      return [];
    }
  });
