import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useI18n } from "@/lib/i18n";
import { useProfile } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", key: "home" },
  { to: "/dashboard", key: "dashboard" },
  { to: "/crops", key: "cropGuide" },
  { to: "/schemes", key: "schemes" },
  { to: "/assistant", key: "krushiAI" },
  { to: "/planner", key: "planner" },
] as const;

export function AppLayout({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const { profile } = useProfile();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.to && "bg-accent text-accent-foreground",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Link
              to="/profile"
              className="hidden h-9 items-center gap-2 rounded-full border border-border bg-muted px-3 text-sm font-medium sm:flex"
              aria-label={t("profile")}
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {profile?.name?.charAt(0).toUpperCase() ?? "🌾"}
              </span>
              <span className="max-w-24 truncate">{profile?.name ?? t("profile")}</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border lg:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border bg-card px-4 pb-4 pt-2 lg:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground",
                  pathname === item.to && "bg-accent text-accent-foreground",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
            >
              {t("profile")}
            </Link>
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="mt-16 border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground sm:px-6">
          <p className="font-medium text-foreground">{t("brand")}</p>
          <p className="mt-1">{t("tagline")}</p>
          <p className="mt-3 text-xs">
            Demo data is used for guidance and scheme matching. Always verify official eligibility
            and crop advisories with your local agriculture department.
          </p>
        </div>
      </footer>
    </div>
  );
}
