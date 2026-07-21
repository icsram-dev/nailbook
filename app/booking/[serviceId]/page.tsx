import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AvailableSlots from "@/components/booking/AvailableSlots";

type PageProps = {
  params: Promise<{
    serviceId: string;
  }>;
};

export default async function BookingServicePage({
  params,
}: PageProps) {
  const { serviceId } = await params;

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Időpontfoglalás
      </h1>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">
          {service.name}
        </h2>

        {service.description && (
          <p className="mt-3 text-gray-600">
            {service.description}
          </p>
        )}

        <div className="mt-6 flex justify-between">
          <span>⏱ {service.duration} perc</span>

          <span className="font-semibold text-pink-600">
            {service.price.toLocaleString("hu-HU")} Ft
          </span>
        </div>
      </div>

      <AvailableSlots serviceId={service.id} />
    </main>
  );
}