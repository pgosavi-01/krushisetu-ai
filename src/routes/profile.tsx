import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AppLayout } from "@/components/AppLayout";
import { SearchSelect, type SelectOption } from "@/components/SearchSelect";
import { SEASONS } from "@/lib/data";
import { INDIA_STATES } from "@/lib/india";
import { CROP_CATALOG, CROP_CATEGORY_LABEL, baseCropKey } from "@/lib/crops-catalog";
import { localizePlace } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useProfile } from "@/lib/store";
import { searchPlaces, type PlaceResult } from "@/lib/places.functions";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Farmer Profile Setup — KrushiSetu AI" },
      {
        name: "description",
        content:
          "Set up your farmer profile with state, district, city, land size, crop and season to unlock personalized guidance on KrushiSetu AI.",
      },
      { property: "og:title", content: "Farmer Profile Setup — KrushiSetu AI" },
      {
        property: "og:description",
        content: "Create your farm profile to get personalized crop and scheme guidance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const { profile, setProfile, clearProfile, loaded } = useProfile();
  const runSearch = useServerFn(searchPlaces);

  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState<{ lat?: number; lon?: number }>({});
  const [land, setLand] = useState("2");
  const [cropId, setCropId] = useState("");
  const [cropCustom, setCropCustom] = useState("");
  const [season, setSeason] = useState<string>("Rabi");
  const [error, setError] = useState("");

  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [placesLoading, setPlacesLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setState(profile.state);
      setDistrict(profile.district);
      setCity(profile.city || profile.district);
      setCoords({ lat: profile.lat, lon: profile.lon });
      setLand(String(profile.land));
      setCropId(profile.cropId ?? profile.crop);
      setCropCustom(profile.cropCustom ?? "");
      setSeason(profile.season);
    }
  }, [profile]);

  const stateOptions: SelectOption[] = useMemo(
    () =>
      Object.keys(INDIA_STATES).map((s) => ({ value: s, label: localizePlace(lang, s) })),
    [lang],
  );

  const districtOptions: SelectOption[] = useMemo(
    () =>
      (INDIA_STATES[state] ?? []).map((d) => ({ value: d, label: localizePlace(lang, d) })),
    [state, lang],
  );

  const cropOptions: SelectOption[] = useMemo(
    () =>
      CROP_CATALOG.map((c) => ({
        value: c.id,
        label: c[lang],
        group: CROP_CATEGORY_LABEL[c.category][lang],
      })),
    [lang],
  );

  const cityOptions: SelectOption[] = useMemo(() => {
    const rows = places.map((p) => ({ value: p.name, label: p.name }));
    if (city && !rows.some((r) => r.value === city)) rows.unshift({ value: city, label: city });
    return rows;
  }, [places, city]);

  const onCitySearch = (q: string) => {
    if (timer.current) clearTimeout(timer.current);
    if (q.trim().length < 2) {
      setPlaces([]);
      return;
    }
    setPlacesLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const res = await runSearch({ data: { query: q.trim(), state, district } });
        setPlaces(res);
      } catch {
        setPlaces([]);
      } finally {
        setPlacesLoading(false);
      }
    }, 350);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const landNum = Number(land);
    if (!name.trim()) return setError(t("errName"));
    if (!state) return setError(t("errState"));
    if (!district) return setError(t("errDistrict"));
    if (!city) return setError(t("errCity"));
    if (!Number.isFinite(landNum) || landNum <= 0) return setError(t("errLand"));
    if (!cropId) return setError(t("errCrop"));
    if (cropId === "other" && !cropCustom.trim()) return setError(t("errCustomCrop"));
    setError("");
    setProfile({
      name: name.trim(),
      state,
      district,
      city,
      ...(coords.lat !== undefined && coords.lon !== undefined
        ? { lat: coords.lat, lon: coords.lon }
        : {}),
      land: landNum,
      crop: baseCropKey(cropId),
      cropId,
      cropCustom: cropCustom.trim(),
      season,
    });
    navigate({ to: "/dashboard" });
  };

  const field =
    "mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25";

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-3xl font-bold tracking-tight">
          {profile ? t("editProfile") : t("createProfile")}
        </h1>
        <p className="mt-2 text-muted-foreground">{t("profileIntro")}</p>

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
              <span className="text-sm font-medium">{t("state")}</span>
              <SearchSelect
                value={state}
                options={stateOptions}
                placeholder={t("selectState")}
                onChange={(v) => {
                  setState(v);
                  setDistrict("");
                  setCity("");
                  setCoords({});
                  setPlaces([]);
                }}
              />
            </div>

            <div>
              <span className="text-sm font-medium">{t("district")}</span>
              <SearchSelect
                value={district}
                options={districtOptions}
                placeholder={t("selectDistrict")}
                disabled={!state}
                disabledHint={t("selectStateFirst")}
                onChange={(v) => {
                  setDistrict(v);
                  setCity("");
                  setCoords({});
                  setPlaces([]);
                }}
              />
            </div>

            <div>
              <span className="text-sm font-medium">{t("cityTown")}</span>
              <SearchSelect
                value={city}
                options={cityOptions}
                placeholder={t("selectCity")}
                disabled={!district}
                disabledHint={t("selectDistrictFirst")}
                loading={placesLoading}
                onSearch={onCitySearch}
                onChange={(v) => {
                  setCity(v);
                  const hit = places.find((p) => p.name === v);
                  setCoords(hit ? { lat: hit.latitude, lon: hit.longitude } : {});
                }}
              />
              <p className="mt-1 text-xs text-muted-foreground">{t("cityTypeHint")}</p>
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

            <div className="sm:col-span-2">
              <span className="text-sm font-medium">{t("mainCrop")}</span>
              <SearchSelect
                value={cropId}
                options={cropOptions}
                placeholder={t("selectMainCrop")}
                onChange={setCropId}
              />
              {cropId === "other" && (
                <div className="mt-3">
                  <label htmlFor="cropCustom" className="text-sm font-medium">
                    {t("customCropLabel")}
                  </label>
                  <input
                    id="cropCustom"
                    value={cropCustom}
                    onChange={(e) => setCropCustom(e.target.value)}
                    placeholder={t("customCropPlaceholder")}
                    className={field}
                  />
                </div>
              )}
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
                  setState("");
                  setDistrict("");
                  setCity("");
                  setCropId("");
                  setCropCustom("");
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
