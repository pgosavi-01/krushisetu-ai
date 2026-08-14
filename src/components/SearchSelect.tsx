import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

export interface SelectOption {
  value: string;
  label: string;
  /** Optional group heading shown above the option. */
  group?: string;
}

interface Props {
  id?: string;
  value: string;
  options: SelectOption[];
  placeholder: string;
  disabled?: boolean;
  disabledHint?: string;
  onChange: (value: string) => void;
  /** Called as the user types (used for async city search). */
  onSearch?: (query: string) => void;
  loading?: boolean;
  emptyExtra?: React.ReactNode;
}

/** Accessible, searchable dropdown that keeps the existing input styling. */
export function SearchSelect({
  id,
  value,
  options,
  placeholder,
  disabled,
  disabledHint,
  onChange,
  onSearch,
  loading,
  emptyExtra,
}: Props) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? value;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || onSearch) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q));
  }, [options, query, onSearch]);

  return (
    <div className="relative" ref={boxRef}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setOpen((o) => !o);
          setQuery("");
        }}
        className="mt-1.5 flex h-11 w-full items-center justify-between rounded-xl border border-input bg-card px-3 text-left text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className={value ? "" : "text-muted-foreground"}>
          {disabled && disabledHint ? disabledHint : value ? selectedLabel : placeholder}
        </span>
        <span className="ml-2 shrink-0 text-muted-foreground">▾</span>
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <div className="border-b border-border p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              placeholder={t("searchPlaceholder")}
              className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
            />
          </div>
          <ul className="max-h-60 overflow-y-auto py-1">
            {loading && (
              <li className="px-3 py-2 text-sm text-muted-foreground">{t("searchingCities")}</li>
            )}
            {!loading && filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted-foreground">{t("noResults")}</li>
            )}
            {filtered.map((o, i) => (
              <li key={`${o.value}-${i}`}>
                {o.group && (o.group !== filtered[i - 1]?.group) && (
                  <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {o.group}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`block w-full px-3 py-2 text-left text-sm hover:bg-accent ${
                    o.value === value ? "bg-accent font-medium" : ""
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
          {emptyExtra && <div className="border-t border-border p-2">{emptyExtra}</div>}
        </div>
      )}
    </div>
  );
}
