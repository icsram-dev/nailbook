import { CalendarView } from "@/components/calendar/CalendarView";
import { prisma } from "@/lib/prisma";

export default async function CalendarPage() {
  const [appointments, customers, services] =
    await Promise.all([
      prisma.appointment.findMany({
        include: {
          customer: true,
          service: true,
        },
        orderBy: {
          startTime: "asc",
        },
      }),

      prisma.user.findMany({
        orderBy: {
          name: "asc",
        },
      }),

      prisma.service.findMany({
        orderBy: {
          name: "asc",
        },
      }),
    ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Naptár
      </h1>

      <CalendarView
        appointments={appointments}
        customers={customers}
        services={services}
      />
    </div>
  );
}