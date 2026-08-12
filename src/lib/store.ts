import { useCallback, useEffect, useState } from "react";
import type { CropKey } from "./data";
import { DEFAULT_TASKS } from "./data";

export interface FarmerProfile {
  name: string;
  state: string;
  district: string;
  land: number;
  crop: CropKey;
  season: string;
}

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

const PROFILE_KEY = "ks_profile";
const TASKS_KEY = "ks_tasks";

export function useProfile() {
  const [profile, setProfileState] = useState<FarmerProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (raw) setProfileState(JSON.parse(raw) as FarmerProfile);
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const setProfile = useCallback((p: FarmerProfile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    setProfileState(p);
  }, []);

  const clearProfile = useCallback(() => {
    localStorage.removeItem(PROFILE_KEY);
    setProfileState(null);
  }, []);

  return { profile, setProfile, clearProfile, loaded };
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(TASKS_KEY);
      if (raw) {
        setTasks(JSON.parse(raw) as Task[]);
      } else {
        const seed = DEFAULT_TASKS.map((title, i) => ({ id: `t${i}`, title, done: false }));
        setTasks(seed);
        localStorage.setItem(TASKS_KEY, JSON.stringify(seed));
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const persist = (next: Task[]) => {
    setTasks(next);
    localStorage.setItem(TASKS_KEY, JSON.stringify(next));
  };

  return {
    tasks,
    loaded,
    addTask: (title: string) =>
      persist([...tasks, { id: `t${Date.now()}`, title, done: false }]),
    toggleTask: (id: string) =>
      persist(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))),
    deleteTask: (id: string) => persist(tasks.filter((t) => t.id !== id)),
    resetTasks: () =>
      persist(DEFAULT_TASKS.map((title, i) => ({ id: `t${i}`, title, done: false }))),
  };
}
