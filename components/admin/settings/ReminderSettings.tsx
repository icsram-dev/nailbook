"use client";

import { useState } from "react";

import SettingsCard from "./SettingsCard";

type Props = {
  settings: {
    reminderEnabled: boolean;
    reminderDaysBefore: number;
  };
};

export default function ReminderSettings({
  settings,
}: Props) {
  const [reminderEnabled, setReminderEnabled] =
    useState(settings.reminderEnabled);

  const [reminderDaysBefore, setReminderDaysBefore] =
    useState(settings.reminderDaysBefore);

  const [loading, setLoading] = useState(false);

  async function handleSave() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/admin/settings/reminders",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reminderEnabled,
            reminderDaysBefore,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();

        throw new Error(
          data.error ??
            "Nem sikerült menteni a beállításokat."
        );
      }

      alert("Beállítások sikeresen mentve.");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Hiba történt a mentés során."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SettingsCard
      title="⏰ Emlékeztetők"
      description="Automatikus emlékeztető e-mailek beállítása."
    >
      <div className="space-y-6">
        <label className="flex items-start justify-between gap-6 rounded-2xl bg-[#f8f5f1] p-5">
          <div>
            <h3 className="font-medium text-stone-800">
              Emlékeztető küldése
            </h3>

            <p className="mt-1 text-sm leading-6 text-stone-600">
              A rendszer automatikusan
              emlékeztető e-mailt küld a
              vendégeknek a foglalás előtt.
            </p>
          </div>

          <input
            type="checkbox"
            checked={reminderEnabled}
            onChange={(e) =>
              setReminderEnabled(
                e.target.checked
              )
            }
            disabled={loading}
            className="mt-1 h-5 w-5 accent-[#a97967] disabled:opacity-50"
          />
        </label>

        <div>
          <label
            htmlFor="reminderDaysBefore"
            className="mb-2 block font-medium"
          >
            Hány nappal előtte?
          </label>

          <input
            id="reminderDaysBefore"
            type="number"
            min={1}
            max={30}
            value={reminderDaysBefore}
            onChange={(e) => {
              const value = Number(
                e.target.value
              );

              setReminderDaysBefore(
                Number.isNaN(value) ? 1 : value
              );
            }}
            disabled={!reminderEnabled || loading}
            className="w-full max-w-40 rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-[#a97967] focus:ring-2 focus:ring-[#eadbd2] disabled:bg-stone-100 disabled:text-stone-500"
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="rounded-full bg-[#a97967] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#8f6252] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Mentés..." : "Mentés"}
        </button>
      </div>
    </SettingsCard>
  );
}
