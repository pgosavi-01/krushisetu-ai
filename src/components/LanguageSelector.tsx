import { LANG_LABELS, useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSelector() {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border bg-muted p-0.5">
      {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors",
            lang === l && "bg-primary text-primary-foreground",
          )}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
