"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Loader2, TriangleAlert } from "lucide-react";

function CancelBookingContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function cancelAppointment() {
      const token = searchParams.get("token");
      if (!token) {
        setMessage("Érvénytelen lemondási link.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("/api/booking/cancel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setSuccess(true);
        setMessage(
          "Köszönjük, hogy időben jelezted a lemondást. Várunk szeretettel egy következő alkalommal."
        );
      } catch (error) {
        setSuccess(false);
        setMessage(error instanceof Error ? error.message : "Nem sikerült lemondani az időpontot.");
      } finally {
        setLoading(false);
      }
    }
    void cancelAppointment();
  }, [searchParams]);

  const icon = loading ? (
    <Loader2 className="size-7 animate-spin" />
  ) : success ? (
    <Check className="size-7" strokeWidth={1.8} />
  ) : (
    <TriangleAlert className="size-7" strokeWidth={1.8} />
  );
  const eyebrow = loading
    ? "Lemondás folyamatban"
    : success
      ? "Foglalás lemondva"
      : "Lemondás sikertelen";
  const title = loading
    ? "Egy pillanat türelmet kérünk."
    : success
      ? "A lemondásodat rögzítettük."
      : "Valami nem sikerült.";

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center px-6 py-16">
      <div className="relative w-full overflow-hidden rounded-[2rem] border border-[#dcc7bb] bg-[#fffdfa] px-7 py-12 text-center shadow-[0_24px_60px_-40px_rgba(74,49,38,.55)] sm:px-12">
        <div className="absolute -left-16 -top-16 size-44 rounded-full border border-[#dcc7bb]" />
        <div className="absolute -bottom-20 -right-16 size-52 rounded-full bg-[#f3e8e1]" />
        <div className="relative">
          <div
            className={`mx-auto grid size-14 place-items-center rounded-full ${success || loading ? "bg-[#f3e8e1] text-[#8f6252]" : "bg-[#f8e9e4] text-[#9a6557]"}`}
          >
            {icon}
          </div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[.22em] text-[#a97967]">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-stone-800 sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-md leading-7 text-stone-600">
            {loading ? "Ellenőrizzük a lemondási kérésedet." : message}
          </p>
          {!loading && (
            <Link
              href="/"
              className="mt-8 inline-flex rounded-full bg-[#a97967] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#8f6252]"
            >
              Vissza a kezdőlapra
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

export default function CancelBookingPage() {
  return (
    <Suspense fallback={<main className="min-h-[60vh]" />}>
      <CancelBookingContent />
    </Suspense>
  );
}
