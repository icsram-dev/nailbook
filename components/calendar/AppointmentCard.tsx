import { Appointment, Service, User } from "@prisma/client";
import { format } from "date-fns";

type AppointmentWithRelations =
  Appointment & {
    customer: User;
    service: Service;
  };

type AppointmentCardProps = {
  appointment: AppointmentWithRelations;
};

export function AppointmentCard({
  appointment,
}: AppointmentCardProps) {
  return (
    <div className="absolute left-1 right-1 rounded-lg bg-pink-500 p-2 text-white shadow">
      <p className="truncate text-sm font-semibold">
        {appointment.service.name}
      </p>

      <p className="truncate text-xs">
        {appointment.customer.name}
      </p>

      <p className="mt-1 text-xs opacity-90">
        {format(appointment.startTime, "HH:mm")} -{" "}
        {format(appointment.endTime, "HH:mm")}
      </p>
    </div>
  );
}