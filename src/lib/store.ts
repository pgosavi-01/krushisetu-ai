import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import type { CropKey } from "./data";
import { getDefaultTasks } from "./content";
import { useI18n } from "./i18n";

export interface FarmerProfile {
  name: string;
  state: string;
  district: string;
  /** Specific city/town used for weather; falls back to district when empty. */
  city: string;
  land: number;
  crop: CropKey;
  season: string;
}

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

export type ReminderCategory =
  | "irrigation"
  | "fertilizer"
  | "pest"
  | "sowing"
  | "harvesting"
  | "inspection"
  | "custom";

export const REMINDER_CATEGORIES: ReminderCategory[] = [
  "irrigation",
  "fertilizer",
  "pest",
  "sowing",
  "harvesting",
  "inspection",
  "custom",
];

export const REMINDER_EMOJI: Record<ReminderCategory, string> = {
  irrigation: "💧",
  fertilizer: "🌿",
  pest: "🐛",
  sowing: "🌱",
  harvesting: "🌾",
  inspection: "🔍",
  custom: "📌",
};

export interface Reminder {
  id: string;
  title: string;
  description: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM, optional */
  time?: string;
  category: ReminderCategory;
  done: boolean;
}

export const PROFILE_KEY = "krushisetu_farmer_profile";
const LEGACY_PROFILE_KEY = "ks_profile";
const TASKS_KEY = "krushisetu_tasks";
const LEGACY_TASKS_KEY = "ks_tasks";
export const REMINDERS_KEY = "krushisetu_reminders";


/* ---------------- Tiny persistent store with subscribers ---------------- */

let profileCache: FarmerProfile | null = null;
let hydrated = false;
const listeners = new Set<() => void>();

function isValidProfile(p: unknown): p is FarmerProfile {
  if (!p || typeof p !== "object") return false;
  const o = p as Record<string, unknown>;
  return typeof o["name"] === "string" && o["name"].trim().length > 0 && typeof o["crop"] === "string";
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(PROFILE_KEY) ?? localStorage.getItem(LEGACY_PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (isValidProfile(parsed)) {
        profileCache = { ...parsed, land: Number(parsed.land) || 0 };
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profileCache));
      }
    }
  } catch {
    /* ignore */
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === PROFILE_KEY) {
      hydrated = false;
      hydrate();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProfile() {
  const profile = useSyncExternalStore(
    subscribe,
    () => {
      hydrate();
      return profileCache;
    },
    () => null,
  );
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  const setProfile = useCallback((p: FarmerProfile) => {
    profileCache = p;
    hydrated = true;
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    } catch {
      /* ignore */
    }
    emit();
  }, []);

  const clearProfile = useCallback(() => {
    profileCache = null;
    try {
      localStorage.removeItem(PROFILE_KEY);
      localStorage.removeItem(LEGACY_PROFILE_KEY);
    } catch {
      /* ignore */
    }
    emit();
  }, []);

  return { profile, setProfile, clearProfile, loaded };
}

export function useTasks() {
  const { lang } = useI18n();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(TASKS_KEY) ?? localStorage.getItem(LEGACY_TASKS_KEY);
      if (raw) {
        setTasks(JSON.parse(raw) as Task[]);
      } else {
        const seed = getDefaultTasks(lang).map((title, i) => ({ id: `t${i}`, title, done: false }));
        setTasks(seed);
        localStorage.setItem(TASKS_KEY, JSON.stringify(seed));
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = (next: Task[]) => {
    setTasks(next);
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  return {
    tasks,
    loaded,
    addTask: (title: string) => persist([...tasks, { id: `t${Date.now()}`, title, done: false }]),
    toggleTask: (id: string) =>
      persist(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))),
    deleteTask: (id: string) => persist(tasks.filter((t) => t.id !== id)),
    resetTasks: () =>
      persist(getDefaultTasks(lang).map((title, i) => ({ id: `t${i}`, title, done: false }))),
  };
}
