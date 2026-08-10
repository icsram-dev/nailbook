"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error);
        }

        setSuccess(true);
        setMessage("Az időpontot sikeresen lemondtad.");
      } catch (error) {
        setSuccess(false);

        setMessage(
          error instanceof Error
            ? error.message
            : "Nem sikerült lemondani az időpontot."
        );
      } finally {
        setLoading(false);
      }
    }

    cancelAppointment();
  }, [searchParams]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-6">
      <div className="w-full rounded-2xl border bg-white p-8 text-center shadow-sm">
        {loading ? (
          <>
            <h1 className="mb-4 text-2xl font-bold">
              Lemondás...
            </h1>

            <p className="text-muted-foreground">
              Kérlek várj egy pillanatot.
            </p>
          </>
        ) : (
          <>
            <h1 className="mb-4 text-2xl font-bold">
              {success ? "Sikeres lemondás" : "Hiba"}
            </h1>

            <p className="mb-8 text-muted-foreground">
              {message}
            </p>

            <Link
              href="/"
              className="inline-flex rounded-lg bg-pink-600 px-5 py-3 font-medium text-white transition hover:bg-pink-700"
            >
              Vissza a főoldalra
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

export default function CancelBookingPage() {
  return (
    <Suspense fallback={<main className="min-h-[70vh]" />}>
      <CancelBookingContent />
    </Suspense>
  );
}
