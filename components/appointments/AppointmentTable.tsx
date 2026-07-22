"use client";

import {
  Appointment,
  AppointmentStatus,
  Service,
  User,
} from "@prisma/client";

import { Button } from "@/components/ui/Button";

type AppointmentWithRelations = Appointment & {
  customer: User;
  service: Service;
};

type AppointmentTableProps = {
  appointments: AppointmentWithRelations[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
};

const statusLabels: Record<AppointmentStatus, string> = {
  PENDING: "Függőben",
  CONFIRMED: "Megerősítve",
  CANCELLED: "Lemondva",
  COMPLETED: "Teljesítve",
  NO_SHOW: "Nem jelent meg",
};

export function AppointmentTable({
  appointments,
  onEdit,
  onDelete,
}: AppointmentTableProps) {
  if (appointments.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
        Még nincs egyetlen foglalás sem.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="p-4 text-left">Vendég</th>
            <th className="p-4 text-left">Szolgáltatás</th>
            <th className="p-4 text-left">Kezdés</th>
            <th className="p-4 text-left">Befejezés</th>
            <th className="p-4 text-left">Ár</th>
            <th className="p-4 text-left">Státusz</th>
            <th className="p-4 text-right">Műveletek</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((appointment) => (
            <tr
              key={appointment.id}
              className="border-b last:border-0"
            >
              <td className="p-4">
                {appointment.customer.name}
              </td>

              <td className="p-4">
                {appointment.service.name}
              </td>

              <td className="p-4">
                {appointment.startTime.toLocaleString("hu-HU")}
              </td>

              <td className="p-4">
                {appointment.endTime.toLocaleString("hu-HU")}
              </td>

              <td className="p-4">
                {appointment.price.toLocaleString("hu-HU")} Ft
              </td>

              <td className="p-4">
                {statusLabels[appointment.status]}
              </td>

              <td className="p-4">
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() =>
                      onEdit(appointment)
                    }
                  >
                    Szerkesztés
                  </Button>

                  <Button
                    onClick={() =>
                      onDelete(appointment.id)
                    }
                  >
                    Törlés
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}