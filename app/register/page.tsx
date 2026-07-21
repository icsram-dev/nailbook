"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    const phoneRegex = /^\+36\s(20|30|31|50|70)\s\d{3}\s\d{4}$/;

if (!phoneRegex.test(form.phone)) {
  setError(
    "A telefonszám formátuma: +36 30 358 0496"
  );
  return;
}

    if (form.password !== form.confirmPassword) {
      setError("A két jelszó nem egyezik.");
      return;
    }

    if (form.password.length < 8) {
      setError(
        "A jelszónak legalább 8 karakter hosszúnak kell lennie."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone.replace(/\s+/g, " ").trim(),
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("Váratlan hiba történt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Regisztráció
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Hozd létre a NailBook fiókodat.
        </p>

        {error && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Név */}

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              required
              placeholder="Pl. Kiss Anna"
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

          {/* Email */}

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              required
              type="email"
              placeholder="pelda@email.hu"
              className="w-full rounded-lg border py-3 pl-11 pr-4 outline-none focus:border-pink-500"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          {/* Telefonszám */}

<div className="relative">
  <Phone
    size={18}
    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
  />

  <input
    required
    type="tel"
    placeholder="+36 30 358 0496"
    className="w-full rounded-lg border py-3 pl-11 pr-4 outline-none focus:border-pink-500"
    value={form.phone}
    autoComplete="tel"
    maxLength={17}
    onChange={(e) => {
      let value = e.target.value;

      value = value.replace(/[^\d+]/g, "");

      if (value.includes("+")) {
        value =
          "+" +
          value.substring(1).replace(/\+/g, "");
      }

      if (value.startsWith("+36")) {
        const digits = value
          .slice(3)
          .replace(/\D/g, "");

        let formatted = "+36";

        if (digits.length > 0) {
          formatted += " " + digits.slice(0, 2);
        }

        if (digits.length > 2) {
          formatted += " " + digits.slice(2, 5);
        }

        if (digits.length > 5) {
          formatted += " " + digits.slice(5, 9);
        }

        value = formatted;
      }

      setForm((prev) => ({
  ...prev,
  phone: value,
}));
    }}
  />
</div>

{/* Jelszó */}
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              required
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Minimum 8 karakter"
              className="w-full rounded-lg border py-3 pl-11 pr-12 outline-none focus:border-pink-500"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* Jelszó megerősítése */}

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              required
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Jelszó megerősítése"
              className="w-full rounded-lg border py-3 pl-11 pr-12 outline-none focus:border-pink-500"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword:
                    e.target.value,
                })
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
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
                Regisztráció...
              </span>
            ) : (
              "Regisztráció"
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Már van fiókod?{" "}
          <Link
            href="/login"
            className="font-semibold text-pink-600 hover:underline"
          >
            Bejelentkezés
          </Link>
        </p>
      </div>
    </main>
  );
}