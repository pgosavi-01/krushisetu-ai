import { useI18n } from "@/lib/i18n";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="14" fill="currentColor" opacity="0.12" />
      <path
        d="M24 38c0-9 6-15 14-15 0 9-6 15-14 15Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path d="M24 38c0-8-5.5-13.5-13-13.5C11 32.5 16.5 38 24 38Z" fill="currentColor" opacity="0.5" />
      <path
        d="M24 38V20"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="24" cy="13" r="4" fill="currentColor" />
      <circle cx="13" cy="18" r="2.6" fill="currentColor" opacity="0.7" />
      <circle cx="35" cy="18" r="2.6" fill="currentColor" opacity="0.7" />
      <path d="M15.4 17 21 14M32.6 17 27 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  const { t } = useI18n();
  return (
    <span className="flex items-center gap-2 text-primary">
      <LogoMark />
      <span className="text-lg font-bold tracking-tight text-foreground">{t("brand")}</span>
    </span>
  );
}
