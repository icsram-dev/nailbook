"use client";

import { useState } from "react";

import SettingsCard from "./SettingsCard";

type Props = {
  settings: {
    emailNotifications: boolean;
  };
};

export default function EmailSettings({
  settings,
}: Props) {
  const [emailNotifications, setEmailNotifications] =
    useState(settings.emailNotifications);

  const [loading, setLoading] = useState(false);

  async function handleSave() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/admin/settings/email",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailNotifications,
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
      title="📧 E-mail értesítések"
      description="Az automatikus e-mail értesítések kezelése."
    >
      <div className="space-y-6">
        <label className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">
              E-mail értesítések
            </h3>

            <p className="text-sm text-gray-500">
              Foglaláskor, módosításkor és
              lemondáskor küldjön a rendszer
              automatikus e-mailt.
            </p>
          </div>

          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) =>
              setEmailNotifications(
                e.target.checked
              )
            }
            disabled={loading}
            className="h-5 w-5 accent-pink-600 disabled:opacity-50"
          />
        </label>

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