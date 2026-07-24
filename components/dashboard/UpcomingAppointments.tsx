import { prisma } from "@/lib/prisma";
import { AppointmentStatus } from "@prisma/client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const statusVariants: Record<
  AppointmentStatus,
  "warning" | "success" | "info" | "default" | "danger"
> = {
  PENDING: "warning",
  CONFIRMED: "success",
  IN_PROGRESS: "info",
  COMPLETED: "default",
  CANCELLED: "danger",
  NO_SHOW: "danger",
};

const statusLabels: Record<AppointmentStatus, string> = {
  PENDING: "Függő",
  CONFIRMED: "Megerősítve",
  IN_PROGRESS: "Folyamatban",
  COMPLETED: "Befejezve",
  CANCELLED: "Lemondva",
  NO_SHOW: "Nem jelent meg",
};

export async function UpcomingAppointments() {
  const appointments = await prisma.appointment.findMany({
    where: {
      startTime: {
        gte: new Date(),
      },
      status: {
        in: ["PENDING", "CONFIRMED", "IN_PROGRESS"],
      },
    },
    include: {
      customer: true,
      service: true,
    },
    orderBy: {
      startTime: "asc",
    },
    take: 5,
  });

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Következő időpontok
        </h2>

        <span className="text-sm text-gray-500">
          {appointments.length} foglalás
        </span>
      </div>

      {appointments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center text-gray-500">
          Nincs közelgő időpont.
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                  {appointment.customer.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {appointment.customer.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {appointment.service.name}
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {appointment.price.toLocaleString("hu-HU")} Ft
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {appointment.startTime.toLocaleDateString("hu-HU")}
                </p>

                <p className="text-sm text-gray-500">
                  {appointment.startTime.toLocaleTimeString("hu-HU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <div className="mt-2">
                  <Badge variant={statusVariants[appointment.status]}>
                    {statusLabels[appointment.status]}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}