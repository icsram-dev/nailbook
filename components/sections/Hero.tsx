"use client";

import Link from "next/link";
import { CalendarDays, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <section className="overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-white py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-pink-600">
              <Sparkles className="size-4" /> NailBook
            </p>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Gyönyörű körmök, személyre szabva.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Minőségi alapanyagokkal, figyelmesen készített körmökkel és
              egyszerű online időpontfoglalással várlak.
            </p>
            {!isAdmin && status !== "loading" && (
              <div className="mt-9">
                <Link href="/booking">
                  <Button size="lg" className="h-12 bg-pink-600 px-6 text-base hover:bg-pink-700">
                    <CalendarDays className="size-5" /> Időpont foglalása
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="relative mx-auto grid aspect-square w-full max-w-md place-items-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pink-200 via-rose-100 to-amber-50 shadow-[0_24px_70px_-30px_rgba(190,24,93,0.45)]">
            <div className="absolute -right-10 -top-10 size-48 rounded-full bg-white/60" />
            <div className="absolute -bottom-14 -left-10 size-56 rounded-full bg-pink-300/40" />
            <div className="relative grid size-48 place-items-center rounded-full border border-white/70 bg-white/70 shadow-lg backdrop-blur">
              <div className="grid size-28 place-items-center rounded-3xl bg-pink-600 text-4xl text-white shadow-lg">✦</div>
            </div>
            <p className="absolute bottom-8 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-pink-800 shadow-sm backdrop-blur">A részletekben rejlik a szépség</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
