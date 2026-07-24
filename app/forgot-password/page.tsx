"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "/api/password-reset/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setMessage(data.message);
    } catch (error) {
      console.error(error);

      setError("Váratlan hiba történt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6">
      <div className="w-full rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Elfelejtetted a jelszavad?
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Add meg az e-mail címedet, és küldünk egy linket az új jelszó
          beállításához.
        </p>

        {error && (
          <div className="mb-5 rounded-lg border border-red-300 bg-red-50 p-3 text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-5 rounded-lg border border-green-300 bg-green-50 p-3 text-green-700">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              E-mail cím
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-pink-500"
              placeholder="pelda@email.hu"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Küldés..."
              : "Jelszó-visszaállító e-mail küldése"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="text-pink-600 hover:underline"
          >
            ← Vissza a bejelentkezéshez
          </Link>
        </div>
      </div>
    </main>
  );
}