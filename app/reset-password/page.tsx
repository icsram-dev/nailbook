"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("Érvénytelen jelszó-visszaállító link.");
      return;
    }

    if (password.length < 8) {
      setError(
        "A jelszónak legalább 8 karakter hosszúnak kell lennie."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("A két jelszó nem egyezik.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
  "/api/password-reset/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSuccess(data.message);

      setTimeout(() => {
        router.push("/login");
      }, 2500);
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
          Új jelszó
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Add meg az új jelszavad.
        </p>

        {error && (
          <div className="mb-5 rounded-lg border border-red-300 bg-red-50 p-3 text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg border border-green-300 bg-green-50 p-3 text-green-700">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Új jelszó"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-lg border py-3 px-4 pr-12 outline-none focus:border-pink-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Új jelszó újra"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full rounded-lg border py-3 px-4 pr-12 outline-none focus:border-pink-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Mentés...
              </span>
            ) : (
              "Jelszó módosítása"
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          <Link
            href="/login"
            className="text-pink-600 hover:underline"
          >
            Vissza a bejelentkezéshez
          </Link>
        </p>
      </div>
    </main>
  );
}