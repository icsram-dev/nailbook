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
        <label className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">
              Emlékeztető küldése
            </h3>

            <p className="text-sm text-gray-500">
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
            className="h-5 w-5 accent-pink-600 disabled:opacity-50"
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
            className="w-32 rounded-xl border px-4 py-2 outline-none transition focus:border-pink-500 disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="rounded-xl bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Mentés..." : "Mentés"}
        </button>
      </div>
    </SettingsCard>
  );
}