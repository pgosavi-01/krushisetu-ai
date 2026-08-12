import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { type CropKey } from "@/lib/data";
import { getCrops, localizePlace } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useProfile } from "@/lib/store";

export const Route = createFileRoute("/crops")({
  head: () => ({
    meta: [
      { title: "Crop Guidance — Onion, Wheat, Rice & More | KrushiSetu AI" },
      {
        name: "description",
        content:
          "Step-by-step sowing, irrigation, fertilizer, pest management and harvesting guidance for onion, wheat, tomato, soybean, cotton and rice.",
      },
      { property: "og:title", content: "Crop Guidance — KrushiSetu AI" },
      {
        property: "og:description",
        content: "Farmer-friendly crop guidance from sowing to harvest for six major Indian crops.",
      },
    ],
  }),
  component: CropsPage,
});

const SECTIONS = [
  { key: "sowing", emoji: "🌱", label: "sowing" },
  { key: "irrigation", emoji: "💧", label: "irrigation" },
  { key: "fertilizer", emoji: "🌿", label: "fertilizer" },
  { key: "pest", emoji: "🐛", label: "pestManagement" },
  { key: "harvest", emoji: "🌾", label: "harvesting" },
] as const;

function CropsPage() {
  const { t, lang } = useI18n();
  const { profile } = useProfile();
  const CROPS = getCrops(lang);
  const [selected, setSelected] = useState<CropKey | null>(null);
  const active = CROPS.find((c) => c.key === (selected ?? profile?.crop ?? "onion")) ?? CROPS[0]!;

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-3xl font-bold tracking-tight">{t("cropGuideTitle")}</h1>
        <p className="mt-2 text-muted-foreground">
{t("cropGuideSubtitle")}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CROPS.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setSelected(c.key)}
              className={`rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                active.key === c.key
                  ? "border-primary bg-primary text-primary-foreground shadow-card"
                  : "border-border bg-card hover:shadow-card"
              }`}
            >
              <span className="text-2xl">{c.emoji}</span>
              <p className="mt-2 text-sm font-semibold">{c.name}</p>
              <p className="text-xs opacity-75">{localizePlace(lang, c.season)}</p>
            </button>
          ))}
        </div>

        <div className="card-soft mt-8 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-2xl">
              {active.emoji}
            </span>
            <div>
              <h2 className="text-xl font-bold">{active.name}</h2>
              <p className="text-sm text-muted-foreground">{t("seasonLabel")}: {active.season}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {SECTIONS.map((s) => (
              <div key={s.key} className="rounded-2xl border border-border bg-background p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <span className="text-lg">{s.emoji}</span> {t(s.label)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{active[s.key]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
