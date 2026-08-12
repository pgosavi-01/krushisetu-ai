import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useI18n } from "@/lib/i18n";
import { useTasks } from "@/lib/store";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Smart Farm Action Planner — KrushiSetu AI" },
      {
        name: "description",
        content:
          "Plan, complete and track daily farm tasks like soil moisture checks, irrigation and pest inspection with a simple progress tracker.",
      },
      { property: "og:title", content: "Smart Farm Action Planner — KrushiSetu AI" },
      {
        property: "og:description",
        content: "Track today's farm tasks and your daily progress in one place.",
      },
    ],
  }),
  component: Planner,
});

function Planner() {
  const { t } = useI18n();
  const { tasks, addTask, toggleTask, deleteTask, resetTasks } = useTasks();
  const [title, setTitle] = useState("");

  const done = tasks.filter((x) => x.done).length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-3xl font-bold tracking-tight">{t("tasks")}</h1>
        <p className="mt-2 text-muted-foreground">
          Add your own tasks, tick them off as you finish, and keep the day on track.
        </p>

        <div className="card-soft mt-8 p-6 sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{t("completed")}</p>
              <p className="text-3xl font-bold">
                {done} / {tasks.length}
              </p>
            </div>
            <button
              type="button"
              onClick={resetTasks}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium hover:bg-accent"
            >
              <RotateCcw className="h-4 w-4" /> Reset day
            </button>
          </div>
          <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!title.trim()) return;
              addTask(title.trim());
              setTitle("");
            }}
            className="mt-6 flex gap-2"
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Clean the drip lines"
              className="h-11 flex-1 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              <Plus className="h-4 w-4" /> <span className="hidden sm:inline">{t("addTask")}</span>
            </button>
          </form>

          <ul className="mt-6 space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4"
              >
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={task.done ? "Mark as pending" : "Mark as complete"}
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors ${
                    task.done ? "border-primary bg-primary text-primary-foreground" : "border-input"
                  }`}
                >
                  {task.done && <Check className="h-4 w-4" />}
                </button>
                <span
                  className={`flex-1 text-sm ${task.done ? "text-muted-foreground line-through" : ""}`}
                >
                  {task.title}
                </span>
                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                  className="text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
            {tasks.length === 0 && (
              <li className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                No tasks yet. Add your first task for today.
              </li>
            )}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
