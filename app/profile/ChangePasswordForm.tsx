"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.newPassword.length < 8) {
      setError("Az új jelszónak legalább 8 karakter hosszúnak kell lennie.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("A két új jelszó nem egyezik.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/profile/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSuccess("A jelszó sikeresen módosítva.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      setError("Váratlan hiba történt.");
    } finally {
      setLoading(false);
    }
  }

  function PasswordField({
    value,
    onChange,
    placeholder,
    visible,
    toggle,
  }: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    visible: boolean;
    toggle: () => void;
  }) {
    return (
      <div className="relative">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          required
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border py-3 pl-11 pr-12 outline-none focus:border-pink-500"
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-2xl border bg-white p-8 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-bold">
        Jelszó módosítása
      </h2>

      {success && (
        <div className="mb-5 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-5 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <PasswordField
          placeholder="Jelenlegi jelszó"
          value={form.currentPassword}
          onChange={(value) =>
            setForm({ ...form, currentPassword: value })
          }
          visible={showCurrent}
          toggle={() => setShowCurrent(!showCurrent)}
        />

        <PasswordField
          placeholder="Új jelszó"
          value={form.newPassword}
          onChange={(value) =>
            setForm({ ...form, newPassword: value })
          }
          visible={showNew}
          toggle={() => setShowNew(!showNew)}
        />

        <PasswordField
          placeholder="Új jelszó megerősítése"
          value={form.confirmPassword}
          onChange={(value) =>
            setForm({ ...form, confirmPassword: value })
          }
          visible={showConfirm}
          toggle={() => setShowConfirm(!showConfirm)}
        />

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
            "Jelszó módosítása"
          )}
        </button>
      </div>
    </form>
  );
}