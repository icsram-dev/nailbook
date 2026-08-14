"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/Button";

function LoginPageContent() {
  const params = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registered = params.get("registered") === "true";
  const callbackUrl = params.get("callbackUrl") ?? "/";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
  email,
  password,
  redirect: false,
  callbackUrl,
});

    setLoading(false);

    if (result?.error) {
      setError("Hibás e-mail vagy jelszó.");
      return;
    }

    window.location.href = result?.url ?? callbackUrl;
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-[2rem] border border-stone-200 bg-[#fffdfa] p-8 shadow-sm">
        <p className="eyebrow text-center">NailBook</p><h1 className="mb-2 mt-3 text-center font-serif text-4xl text-stone-800">Bejelentkezés</h1>

        <p className="mb-8 text-center text-gray-500">
          Üdv újra a NailBookban!
        </p>

        {registered && (
          <div className="mb-5 rounded-lg border border-green-300 bg-green-50 p-3 text-green-700">
            A regisztráció sikeres volt.
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-lg border border-red-300 bg-red-50 p-3 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              required
              placeholder="pelda@email.hu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-[#a97967] focus:ring-2 focus:ring-[#eadbd2]"
            />
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-12 outline-none focus:border-[#a97967] focus:ring-2 focus:ring-[#eadbd2]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-[#8f6252] hover:underline"
            >
              Elfelejtetted a jelszavad?
            </Link>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Bejelentkezés...
              </span>
            ) : (
              "Bejelentkezés"
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Nincs még fiókod?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#8f6252] hover:underline"
          >
            Regisztráció
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<main className="min-h-screen" />}><LoginPageContent /></Suspense>;
}
