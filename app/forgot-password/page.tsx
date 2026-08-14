"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/password-reset/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setMessage("Elküldtük a jelszó-visszaállító linket a megadott e-mail címre.");
    } catch (error) {
      console.error(error);

      setError("Váratlan hiba történt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6">
      <div className="w-full rounded-3xl border border-stone-200 bg-[#fffdfa] p-8 shadow-sm">
        <h1 className="mb-2 text-center font-serif text-3xl text-stone-800">
          Elfelejtetted a jelszavad?
        </h1>

        <p className="mb-8 text-center leading-7 text-stone-600">
          Add meg az e-mail címedet, és küldünk egy linket az új jelszó
          beállításához.
        </p>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-5 rounded-xl border border-[#dcc7bb] bg-[#f3e8e1] p-4 text-sm leading-6 text-[#6e4a3c]">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">E-mail cím</label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-800 outline-none transition focus:border-[#a97967] focus:ring-2 focus:ring-[#e8d5cb]"
              placeholder="pelda@email.hu"
            />
          </div>

          <Button type="submit" disabled={loading} className="h-11 w-full rounded-full bg-[#a97967] text-white hover:bg-[#8f6252]">
            {loading ? "Küldés..." : "Jelszó-visszaállító e-mail küldése"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/login" className="text-sm font-medium text-[#8f6252] hover:underline">
            ← Vissza a bejelentkezéshez
          </Link>
        </div>
      </div>
    </main>
  );
}
