import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { formatShortDate, toDateKey } from "@/lib/date";
import { useI18n } from "@/lib/i18n";
import {
  REMINDER_CATEGORIES,
  REMINDER_EMOJI,
  useReminders,
  type Reminder,
  type ReminderCategory,
} from "@/lib/store";

const fieldCls =
  "mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25";

export function RemindersPanel() {
  const { t, lang } = useI18n();
  const { reminders, addReminder, updateReminder, toggleReminder, deleteReminder } = useReminders();

  const [editing, setEditing] = useState<Reminder | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(toDateKey());
  const [time, setTime] = useState("");
  const [category, setCategory] = useState<ReminderCategory>("irrigation");
  const [error, setError] = useState("");

  const reset = () => {
    setEditing(null);
    setOpenForm(false);
    setTitle("");
    setDescription("");
    setDate(toDateKey());
    setTime("");
    setCategory("irrigation");
    setError("");
  };

  const startEdit = (r: Reminder) => {
    setEditing(r);
    setOpenForm(true);
    setTitle(r.title);
    setDescription(r.description);
    setDate(r.date);
    setTime(r.time ?? "");
    setCategory(r.category);
    setError("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setError(t("errReminderTitle"));
    const payload = {
      title: title.trim(),
      description: description.trim(),
      date,
      category,
      ...(time ? { time } : {}),
    };
    if (editing) updateReminder(editing.id, payload);
    else addReminder(payload);
    reset();
  };

  return (
    <section className="card-soft p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold">🔔 {t("allReminders")}</h2>
        <button
          type="button"
          onClick={() => (openForm ? reset() : setOpenForm(true))}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          {openForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {openForm ? t("cancel") : t("addReminder")}
        </button>
      </div>

      {openForm && (
        <form onSubmit={submit} className="mt-5 rounded-2xl border border-border bg-background p-5">
          <p className="text-sm font-semibold">{editing ? t("editReminder") : t("addReminder")}</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="r-title" className="text-sm font-medium">
                {t("reminderTitle")}
              </label>
              <input
                id="r-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("reminderTitlePlaceholder")}
                className={fieldCls}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="r-desc" className="text-sm font-medium">
                {t("reminderDesc")} <span className="text-muted-foreground">({t("optional")})</span>
              </label>
              <input
                id="r-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("reminderDescPlaceholder")}
                className={fieldCls}
              />
            </div>
            <div>
              <label htmlFor="r-date" className="text-sm font-medium">
                {t("reminderDate")}
              </label>
              <input
                id="r-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={fieldCls}
              />
            </div>
            <div>
              <label htmlFor="r-time" className="text-sm font-medium">
                {t("reminderTime")}{" "}
                <span className="text-muted-foreground">({t("optional")})</span>
              </label>
              <input
                id="r-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={fieldCls}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="r-cat" className="text-sm font-medium">
                {t("reminderCategory")}
              </label>
              <select
                id="r-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value as ReminderCategory)}
                className={fieldCls}
              >
                {REMINDER_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {REMINDER_EMOJI[c]} {t(`cat${c}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              className="h-11 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              {t("saveReminder")}
            </button>
            <button
              type="button"
              onClick={reset}
              className="h-11 rounded-full border border-border px-6 text-sm font-medium text-muted-foreground hover:bg-accent"
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      )}

      <ul className="mt-6 space-y-2">
        {reminders.map((r) => (
          <li
            key={r.id}
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-background p-4"
          >
            <button
              type="button"
              onClick={() => toggleReminder(r.id)}
              aria-label={r.done ? t("markUndone") : t("markDone")}
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors ${
                r.done ? "border-primary bg-primary text-primary-foreground" : "border-input"
              }`}
            >
              {r.done && <Check className="h-4 w-4" />}
            </button>
            <div className="min-w-40 flex-1">
              <p className={`text-sm font-medium ${r.done ? "text-muted-foreground line-through" : ""}`}>
                {REMINDER_EMOJI[r.category]} {r.title}
              </p>
              {r.description && (
                <p className="text-xs text-muted-foreground">{r.description}</p>
              )}
              <p className="mt-0.5 text-xs text-muted-foreground">
                {formatShortDate(lang, new Date(`${r.date}T00:00:00`))}
                {r.time ? ` · ${r.time}` : ""} · {t(`cat${r.category}`)}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => startEdit(r)}
                aria-label={t("editReminder")}
                className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-accent"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => deleteReminder(r.id)}
                aria-label={t("deleteReminder")}
                className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
        {reminders.length === 0 && (
          <li className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            {t("noReminders")}
          </li>
        )}
      </ul>
    </section>
  );
}
