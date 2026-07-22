import { prisma } from "@/lib/prisma";
import { CalendarView } from "@/components/calendar/CalendarView";

export default async function CalendarPage() {
  const appointments =
    await prisma.appointment.findMany({
      include: {
        customer: true,
        service: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Naptár
      </h1>

      <CalendarView
        appointments={appointments}
      />
    </div>
  );
}