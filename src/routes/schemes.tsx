import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { SCHEMES, matchSchemes, type Scheme } from "@/lib/data";
import { getCrop, localizePlace, localizeScheme } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useProfile } from "@/lib/store";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Government Scheme Matcher for Farmers — KrushiSetu AI" },
      {
        name: "description",
        content:
          "Discover Indian government farming schemes that may suit your state, land size and crop, with benefits, eligibility and required documents.",
      },
      { property: "og:title", content: "Government Scheme Matcher — KrushiSetu AI" },
      {
        property: "og:description",
        content: "Find farming schemes that may be relevant to your farm profile.",
      },
    ],
  }),
  component: SchemesPage,
});

function SchemesPage() {
  const { t, lang } = useI18n();
  const { profile } = useProfile();
  const [open, setOpen] = useState<Scheme | null>(null);
  const [showAll, setShowAll] = useState(false);

  const matched = profile ? matchSchemes(profile) : [];
  const matchedIds = new Set(matched.map((s) => s.id));
  const list = (profile && !showAll ? matched : SCHEMES).map((s) => localizeScheme(lang, s));

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-3xl font-bold tracking-tight">{t("schemesTitle")}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {profile
            ? t("schemesMatched", {
                state: localizePlace(lang, profile.state),
                land: profile.land,
                crop: getCrop(lang, profile.crop).name,
                count: matched.length,
              })
            : t("schemesNoProfile")}
        </p>

        {!profile && (
          <Link
            to="/profile"
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
          >
            {t("getStarted")} <ArrowRight className="h-4 w-4" />
          </Link>
        )}

        {profile && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="mt-4 h-10 rounded-full border border-border bg-card px-5 text-sm font-medium hover:bg-accent"
          >
            {showAll ? t("showMatchedOnly") : t("showAllSchemes")}
          </button>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <article key={s.id} className="card-soft flex flex-col p-6">
              {matchedIds.has(s.id) && (
                <span className="mb-3 w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  {t("potentially")}
                </span>
              )}
              <h2 className="text-base font-semibold">{s.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <p className="mt-3 text-sm">
                <span className="font-medium">{t("benefits")}: </span>
                <span className="text-muted-foreground">{s.benefits}</span>
              </p>
              <button
                type="button"
                onClick={() => setOpen(s)}
                className="mt-5 h-10 w-fit rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
              >
                {t("viewDetails")}
              </button>
            </article>
          ))}
        </div>

        <div className="mt-8 flex gap-3 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
          <AlertTriangle className="h-5 w-5 shrink-0 text-primary" />
          <p>
{t("schemeDisclaimer")}
          </p>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 sm:items-center sm:p-6"
          onClick={() => setOpen(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-card p-6 shadow-card sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold">{open.name}</h2>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border"
                aria-label={t("close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{open.description}</p>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="font-semibold">{t("benefits")}</p>
                <p className="text-muted-foreground">{open.benefits}</p>
              </div>
              <div>
                <p className="font-semibold">{t("eligibility")}</p>
                <p className="text-muted-foreground">{open.eligibility}</p>
              </div>
              <div>
                <p className="font-semibold">{t("requiredDocuments")}</p>
                <ul className="mt-1 list-disc pl-5 text-muted-foreground">
                  {open.documents.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-5 rounded-xl bg-muted p-3 text-xs text-muted-foreground">
{t("officialNote")}
            </p>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
