"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";

function ResetPasswordPageContent() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setSuccess("");
    if (!token) { setError("Érvénytelen jelszó-visszaállító link."); return; }
    if (password.length < 8) { setError("A jelszónak legalább 8 karakter hosszúnak kell lennie."); return; }
    if (password !== confirmPassword) { setError("A két jelszó nem egyezik."); return; }
    setLoading(true);
    try {
      const response = await fetch("/api/password-reset/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, password }) });
      const data = await response.json();
      if (!response.ok) { setError(data.message); return; }
      setSuccess("A jelszavad sikeresen megváltozott. Hamarosan átirányítunk a bejelentkezéshez.");
      setTimeout(() => router.push("/login"), 2500);
    } catch { setError("Váratlan hiba történt."); } finally { setLoading(false); }
  }

  return <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-16"><div className="relative w-full overflow-hidden rounded-[2rem] border border-stone-200 bg-[#fffdfa] p-8 shadow-[0_24px_60px_-40px_rgba(74,49,38,.55)]"><div className="absolute -right-16 -top-16 size-40 rounded-full border border-[#dcc7bb]"/><div className="relative"><div className="mx-auto grid size-14 place-items-center rounded-full bg-[#f3e8e1] text-[#8f6252]"><KeyRound className="size-6"/></div><p className="mt-6 text-center text-xs font-semibold uppercase tracking-[.22em] text-[#a97967]">Fiókbiztonság</p><h1 className="mt-3 text-center font-serif text-4xl text-stone-800">Új jelszó</h1><p className="mt-3 text-center leading-7 text-stone-600">Adj meg egy új, biztonságos jelszót a fiókodhoz.</p>{error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}{success && <div className="mt-6 rounded-xl border border-[#dcc7bb] bg-[#f3e8e1] p-4 text-sm leading-6 text-[#6e4a3c]">{success}</div>}<form onSubmit={handleSubmit} className="mt-7 space-y-4"><div className="relative"><input required type={showPassword ? "text" : "password"} placeholder="Új jelszó" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-4 pr-12 text-stone-800 outline-none transition focus:border-[#a97967] focus:ring-2 focus:ring-[#e8d5cb]"/><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 transition hover:text-[#8f6252]" aria-label="Jelszó megjelenítése">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div><div className="relative"><input required type={showConfirmPassword ? "text" : "password"} placeholder="Új jelszó megerősítése" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-4 pr-12 text-stone-800 outline-none transition focus:border-[#a97967] focus:ring-2 focus:ring-[#e8d5cb]"/><button type="button" onClick={() => setShowConfirmPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 transition hover:text-[#8f6252]" aria-label="Jelszó megjelenítése">{showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div><button type="submit" disabled={loading} className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#a97967] text-sm font-medium text-white transition hover:bg-[#8f6252] disabled:opacity-60">{loading && <Loader2 className="size-4 animate-spin"/>}{loading ? "Mentés..." : "Jelszó módosítása"}</button></form><div className="mt-7 text-center"><Link href="/login" className="text-sm font-medium text-[#8f6252] hover:underline">Vissza a bejelentkezéshez</Link></div></div></div></main>;
}

export default function ResetPasswordPage() { return <Suspense fallback={<main className="min-h-[70vh]"/>}><ResetPasswordPageContent /></Suspense>; }
