"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero() {
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <section className="bg-pink-50 py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-500">
              Üdvözöl a NailBook
            </p>

            <h1 className="text-5xl font-bold leading-tight text-gray-900">
              Gyönyörű körmök.
              <br />
              Egyszerű online időpontfoglalás.
            </h1>

            <p className="mt-6 max-w-lg text-lg text-gray-600">
              Foglalj időpontot néhány kattintással, és élvezd a gyors,
              kényelmes online időpontfoglalást.
            </p>

            {!isAdmin && (
              <div className="mt-10">
                <Link href="/booking">
                  <Button>Időpontot foglalok</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <div className="flex h-96 w-80 items-center justify-center rounded-3xl bg-white shadow-xl">
              💅
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
