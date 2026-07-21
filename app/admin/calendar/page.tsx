import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { prisma } from "@/lib/prisma";
import { formatDate, formatTime } from "@/lib/date";

export default async function CalendarPage() {
  const appointments = await prisma.appointment.findMany({
    include: {
      customer: true,
      service: true,
    },
    orderBy: {
      startTime: "asc",
    },
    take: 20,
  });

  return (
    <>
      <AdminPageHeader
        title="Naptár"
        description="Foglalások időrendi áttekintése."
      />

      <div className="rounded-2xl border bg-white shadow-sm">
        {appointments.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            Nincs még időpont.
          </div>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between border-b p-5 last:border-none"
            >
              <div>
                <h2 className="font-semibold">
                  {appointment.customer.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {appointment.service.name}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {formatDate(appointment.startTime)}
                </p>

                <p className="text-gray-500">
                  {formatTime(appointment.startTime)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}