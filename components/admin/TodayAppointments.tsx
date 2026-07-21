import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatTime } from "@/lib/date";

export default async function TodayAppointments() {
  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const appointments = await prisma.appointment.findMany({
    where: {
      startTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      customer: true,
      service: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return (
    <div className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Mai foglalások
        </h2>

        <Link
          href="/admin/appointments"
          className="text-sm font-medium text-pink-600 hover:underline"
        >
          Összes megtekintése
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-500">
          Ma nincs foglalás.
        </p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-gray-50"
            >
              <div>
                <h3 className="font-semibold">
                  {appointment.customer.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {appointment.service.name}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {formatTime(appointment.startTime)}
                </p>

                <p className="text-sm text-gray-500">
                  {appointment.price.toLocaleString("hu-HU")} Ft
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}