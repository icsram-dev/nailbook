import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    serviceId: string;
  }>;
};

export default async function ServiceBookingPage({
  params,
}: Props) {
  const { serviceId } = await params;

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
      active: true,
    },
  });

  if (!service) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          {service.name}
        </h1>

        {service.description && (
          <p className="mt-3 text-gray-500">
            {service.description}
          </p>
        )}

        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Időtartam
            </p>

            <p className="mt-1 text-xl font-semibold">
              {service.duration} perc
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Ár
            </p>

            <p className="mt-1 text-xl font-semibold text-pink-600">
              {service.price.toLocaleString("hu-HU")} Ft
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-dashed p-8 text-center text-gray-500">
          📅 Ide fog kerülni a foglalási naptár.
        </div>
      </div>
    </main>
  );
}