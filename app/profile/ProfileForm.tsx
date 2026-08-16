"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { User, Mail, Phone, Save, Loader2 } from "lucide-react";

type Props = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

export default function ProfileForm({ user }: Props) {
  const router = useRouter();
  const { update } = useSession();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      await update();
      router.refresh();

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
      className="mt-6 rounded-[1.75rem] border border-stone-200 bg-[#fffdfa] p-7 shadow-sm"
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

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="relative">
          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            required
            placeholder="Vezetéknév"
            className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-[#a97967] focus:ring-2 focus:ring-[#eadbd2]"
            value={form.lastName}
            onChange={(e) =>
              setForm({
                ...form,
                lastName: e.target.value,
              })
            }
          />
        </div>

        <div className="relative">
          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            required
            placeholder="Keresztnév"
            className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-[#a97967] focus:ring-2 focus:ring-[#eadbd2]"
            value={form.firstName}
            onChange={(e) =>
              setForm({
                ...form,
                firstName: e.target.value,
              })
            }
          />
        </div>

        <div className="relative">
          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-stone-200 bg-stone-100 py-3 pl-11 pr-4 text-stone-500"
            value={form.email}
          />
        </div>

        <div className="relative">
          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="tel"
            placeholder="+36 30 358 0496"
            className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-[#a97967] focus:ring-2 focus:ring-[#eadbd2]"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#a97967] px-5 py-3 font-medium text-white transition hover:bg-[#8f6252] disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
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
