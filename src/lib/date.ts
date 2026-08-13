import type { Lang } from "./i18n";

const LOCALES: Record<Lang, string> = { en: "en-IN", mr: "mr-IN", hi: "hi-IN" };

/** e.g. "Thursday, 13 August 2026" / "गुरुवार, १३ ऑगस्ट २०२६" */
export function formatLongDate(lang: Lang, date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat(LOCALES[lang], {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return date.toDateString();
  }
}

/** e.g. "Fri 14 Aug" — used in the short forecast strip. */
export function formatShortDate(lang: Lang, date: Date): string {
  try {
    return new Intl.DateTimeFormat(LOCALES[lang], {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(date);
  } catch {
    return date.toDateString();
  }
}

/** e.g. "10:32 am" */
export function formatTime(lang: Lang, date: Date): string {
  try {
    return new Intl.DateTimeFormat(LOCALES[lang], {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  } catch {
    return date.toTimeString().slice(0, 5);
  }
}

/** Local YYYY-MM-DD (not UTC) for reminder date comparison. */
export function toDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
