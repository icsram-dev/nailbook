import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import AppointmentCard from "@/components/appointments/AppointmentCard";

export default async function MyBookingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Az admin nem használhatja a vendég Foglalásaim oldalt.
  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  // A lejárt, még aktív foglalások automatikusan teljesítettnek számítanak.
  await prisma.appointment.updateMany({
    where: {
      customerId: session.user.id,
      status: {
        in: ["PENDING", "CONFIRMED"],
      },
      endTime: {
        lt: new Date(),
      },
    },
    data: {
      status: "COMPLETED",
    },
  });

  const appointments = await prisma.appointment.findMany({
    where: {
      customerId: session.user.id,
    },
    include: {
      service: true,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  const appointmentsForCards = appointments.map((appointment) => ({
    id: appointment.id,
    startTime: appointment.startTime.toISOString(),
    endTime: appointment.endTime.toISOString(),
    price: appointment.price,
    status: appointment.status,
    customerNote: appointment.customerNote,
    createdAt: appointment.createdAt.toISOString(),
    updatedAt: appointment.updatedAt.toISOString(),
    service: {
      id: appointment.service.id,
      name: appointment.service.name,
      description: appointment.service.description,
      duration: appointment.service.duration,
      price: appointment.service.price,
    },
  }));

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">
          Foglalásaim
        </h1>

        <p className="mt-2 text-muted-foreground">
          Itt találod a korábbi és a közelgő időpontjaidat.
        </p>
      </div>

      {appointmentsForCards.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold">
            Még nincs foglalásod
          </h2>

          <p className="mt-2 text-gray-500">
            Foglalj időpontot a szolgáltatások közül.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {appointmentsForCards.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
            />
          ))}
        </div>
      )}
    </main>
  );
}