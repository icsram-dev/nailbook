import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";
import StatusSelect from "@/components/admin/StatusSelect";
import { prisma } from "@/lib/prisma";
import {
  formatDate,
  formatTime,
  formatCurrency,
} from "@/lib/date";

export default async function AppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    include: {
      customer: true,
      service: true,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return (
    <>
      <AdminPageHeader
  title="Foglalások"
  description="Kezeld az összes foglalást."
  actions={
    <Link
      href="/admin/appointments/new"
      className="rounded-xl bg-pink-600 px-5 py-3 font-medium text-white transition hover:bg-pink-700"
    >
      + Új foglalás
    </Link>
  }
/>

      <AdminTable
  headers={[
    "Dátum",
    "Idő",
    "Vendég",
    "Szolgáltatás",
    "Ár",
    "Státusz",
    "Műveletek",
  ]}
  emptyMessage="Még nincs egyetlen foglalás sem."
>
        {appointments.map((appointment) => (
          <tr
            key={appointment.id}
            className="border-t hover:bg-gray-50"
          >
            <td className="px-6 py-4">
              {formatDate(appointment.startTime)}
            </td>

            <td className="px-6 py-4">
              {formatTime(appointment.startTime)}
            </td>

            <td className="px-6 py-4 font-medium">
              {appointment.customer.name}
            </td>

            <td className="px-6 py-4">
              {appointment.service.name}
            </td>

            <td className="px-6 py-4">
              {formatCurrency(appointment.price)}
            </td>

            <td className="px-6 py-4">
              <StatusSelect
                appointmentId={appointment.id}
                status={appointment.status}
              />
            </td>

            <td className="px-6 py-4">
              <Link
                href={`/admin/appointments/${appointment.id}`}
                className="rounded-lg bg-pink-600 px-4 py-2 text-sm text-white transition hover:bg-pink-700"
              >
                Szerkesztés
              </Link>
            </td>
          </tr>
        ))}
      </AdminTable>
    </>
  );
}