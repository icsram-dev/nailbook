"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Save,
  Loader2,
} from "lucide-react";

type Props = {
  user: {
    name: string;
    email: string;
    phone: string;
  };
};

export default function ProfileForm({
  user,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSuccess("A profil sikeresen frissítve.");
    } catch {
      setError("Váratlan hiba történt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-white p-8 shadow-sm"
    >
      {success && (
        <div className="rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="relative">
        <User
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          required
          className="w-full rounded-lg border py-3 pl-11 pr-4 outline-none focus:border-pink-500"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />
      </div>

      <div className="relative">
        <Mail
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          disabled
          className="w-full cursor-not-allowed rounded-lg border bg-gray-100 py-3 pl-11 pr-4 text-gray-500"
          value={form.email}
        />
      </div>

      <div className="relative">
        <Phone
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="tel"
          placeholder="+36 30 358 0496"
          className="w-full rounded-lg border py-3 pl-11 pr-4 outline-none focus:border-pink-500"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />
      </div>

      <button
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 px-5 py-3 font-medium text-white transition hover:bg-pink-600 disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Mentés...
          </>
        ) : (
          <>
            <Save size={18} />
            Mentés
          </>
        )}
      </button>
    </form>
  );
}