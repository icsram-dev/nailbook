import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function BookingPage() {
  const services = await prisma.service.findMany({
    where: {
      active: true,
    },
    orderBy: {
      price: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">
          Online időpontfoglalás
        </h1>

        <p className="mt-3 text-gray-500">
          Válassz egy szolgáltatást a foglalás megkezdéséhez.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/book/${service.id}`}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-pink-300 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">
              {service.name}
            </h2>

            {service.description && (
              <p className="mt-2 text-gray-500">
                {service.description}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between">
              <span className="font-medium">
                {service.duration} perc
              </span>

              <span className="text-lg font-bold text-pink-600">
                {service.price.toLocaleString("hu-HU")} Ft
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}