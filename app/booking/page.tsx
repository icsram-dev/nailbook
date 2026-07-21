"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Service = {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price: number;
};

export default function BookingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();

        if (response.ok) {
          setServices(data.services);
        }
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Időpontfoglalás
      </h1>

      {loading ? (
        <p>Betöltés...</p>
      ) : services.length === 0 ? (
        <p>Nincs elérhető szolgáltatás.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">
                {service.name}
              </h2>

              {service.description && (
                <p className="mt-2 text-gray-600">
                  {service.description}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  ⏱ {service.duration} perc
                </span>

                <span className="font-semibold text-pink-600">
                  {service.price.toLocaleString("hu-HU")} Ft
                </span>
              </div>

              <Link
                href={`/booking/${service.id}`}
                className="mt-6 block rounded-lg bg-pink-500 px-4 py-3 text-center text-white transition hover:bg-pink-600"
                >
              Kiválasztom
            </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}