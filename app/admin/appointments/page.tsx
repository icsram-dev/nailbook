import { prisma } from "@/lib/prisma";
import { AppointmentStatus } from "@prisma/client";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AppointmentFilters from "@/components/admin/AppointmentFilters";
import AppointmentStatusBadge from "@/components/admin/AppointmentStatusBadge";

import { format } from "date-fns";
import { hu } from "date-fns/locale";

import Link from "next/link";

type Props = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

export default async function AppointmentsPage({ searchParams }: Props) {
  const { search, status } = await searchParams;

  const appointments = await prisma.appointment.findMany({
    where: {
      ...(search && {
        customer: {
          OR: [
            {
              firstName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
      }),

      ...(status && {
        status: status as AppointmentStatus,
      }),
    },

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
      <AdminPageHeader title="Foglalások" description="Az összes időpont áttekintése." />

      <AppointmentFilters />

      <div className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-sm text-gray-500">
              <th className="px-6 py-4">Dátum</th>
              <th className="px-6 py-4">Idő</th>
              <th className="px-6 py-4">Vendég</th>
              <th className="px-6 py-4">Szolgáltatás</th>
              <th className="px-6 py-4">Ár</th>
              <th className="px-6 py-4">Státusz</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b transition hover:bg-pink-50 last:border-0"
              >
                <td className="px-6 py-4">
                  {format(appointment.startTime, "yyyy.MM.dd", {
                    locale: hu,
                  })}
                </td>

                <td className="px-6 py-4">{format(appointment.startTime, "HH:mm")}</td>

                <td className="px-6 py-4 font-medium">
                  <Link
                    href={`/admin/appointments/${appointment.id}`}
                    className="text-pink-600 hover:underline"
                  >
                    {appointment.customer.lastName} {appointment.customer.firstName}
                  </Link>
                </td>

                <td className="px-6 py-4">{appointment.service.name}</td>

                <td className="px-6 py-4">{appointment.price.toLocaleString("hu-HU")} Ft</td>

                <td className="px-6 py-4">
                  <AppointmentStatusBadge status={appointment.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
