import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatTime } from "@/lib/date";
import AppointmentStatusBadge from "./AppointmentStatusBadge";

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
        <h2 className="text-2xl font-bold">Mai foglalások</h2>

        <Link
          href="/admin/appointments"
          className="text-sm font-medium text-pink-600 hover:underline"
        >
          Összes megtekintése
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-500">Ma nincs foglalás.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="pb-3">Idő</th>
                <th className="pb-3">Vendég</th>
                <th className="pb-3">Szolgáltatás</th>
                <th className="pb-3">Ár</th>
                <th className="pb-3">Státusz</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-4 font-medium">{formatTime(appointment.startTime)}</td>

                  <td className="py-4">
                    {appointment.customer.lastName} {appointment.customer.firstName}
                  </td>

                  <td className="py-4">{appointment.service.name}</td>

                  <td className="py-4">{appointment.price.toLocaleString("hu-HU")} Ft</td>

                  <td className="py-4">
                    <AppointmentStatusBadge status={appointment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
