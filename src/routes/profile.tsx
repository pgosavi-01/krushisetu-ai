import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { SEASONS, STATES, type CropKey } from "@/lib/data";
import { getCrops, localizePlace } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useProfile } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Farmer Profile Setup — KrushiSetu AI" },
      {
        name: "description",
        content:
          "Set up your farmer profile with state, district, land size, crop and season to unlock personalized guidance on KrushiSetu AI.",
      },
      { property: "og:title", content: "Farmer Profile Setup — KrushiSetu AI" },
      {
        property: "og:description",
        content: "Create your farm profile to get personalized crop and scheme guidance.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { t, lang } = useI18n();
  const CROPS = getCrops(lang);
  const navigate = useNavigate();
  const { profile, setProfile, clearProfile, loaded } = useProfile();

  const [name, setName] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [district, setDistrict] = useState("Nashik");
  const [city, setCity] = useState("Sinnar");
  const [land, setLand] = useState("2");
  const [crop, setCrop] = useState<CropKey>("onion");
  const [season, setSeason] = useState<string>("Rabi");
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setState(profile.state);
      setDistrict(profile.district);
      setCity(profile.city || profile.district);
      setLand(String(profile.land));
      setCrop(profile.crop);
      setSeason(profile.season);
    }
  }, [profile]);

  const districts = STATES[state] ?? [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const landNum = Number(land);
    if (!name.trim()) return setError(t("errName"));
    if (!Number.isFinite(landNum) || landNum <= 0) return setError(t("errLand"));
    setError("");
    setProfile({
      name: name.trim(),
      state,
      district,
      city: city.trim() || district,
      land: landNum,
      crop,
      season,
    });
    navigate({ to: "/dashboard" });
  };


  const field = "mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25";

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-3xl font-bold tracking-tight">{profile ? t("editProfile") : t("createProfile")}</h1>
        <p className="mt-2 text-muted-foreground">
{t("profileIntro")}
        </p>

        <form onSubmit={submit} className="card-soft mt-8 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="text-sm font-medium">
                {t("farmerName")}
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("farmerNamePlaceholder")}
                className={field}
              />
            </div>

            <div>
              <label htmlFor="state" className="text-sm font-medium">
                {t("state")}
              </label>
              <select
                id="state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setDistrict(STATES[e.target.value]?.[0] ?? "");
                }}
                className={field}
              >
                {Object.keys(STATES).map((s) => (
                  <option key={s} value={s}>{localizePlace(lang, s)}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="district" className="text-sm font-medium">
                {t("district")}
              </label>
              <select
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={field}
              >
                {districts.map((d) => (
                  <option key={d} value={d}>{localizePlace(lang, d)}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="land" className="text-sm font-medium">
                {t("landSize")}
              </label>
              <input
                id="land"
                type="number"
                min="0.1"
                step="0.1"
                value={land}
                onChange={(e) => setLand(e.target.value)}
                className={field}
              />
            </div>

            <div>
              <label htmlFor="crop" className="text-sm font-medium">
                {t("mainCrop")}
              </label>
              <select
                id="crop"
                value={crop}
                onChange={(e) => setCrop(e.target.value as CropKey)}
                className={field}
              >
                {CROPS.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.emoji} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <span className="text-sm font-medium">{t("season")}</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {SEASONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSeason(s)}
                    className={`h-10 rounded-full border px-5 text-sm font-medium transition-colors ${
                      season === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {localizePlace(lang, s)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="submit"
              className="h-11 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("saveProfile")}
            </button>
            {loaded && profile && (
              <button
                type="button"
                onClick={() => {
                  clearProfile();
                  setName("");
                }}
                className="h-11 rounded-full border border-border px-6 text-sm font-medium text-muted-foreground hover:bg-accent"
              >
                {t("clearProfile")}
              </button>
            )}
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
