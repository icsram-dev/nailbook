import {
  Appointment,
  Service,
  User,
} from "@prisma/client";

import { getTimeSlots } from "@/lib/calendar";

type AppointmentWithRelations =
  Appointment & {
    customer: User;
    service: Service;
  };

type CalendarGridProps = {
  appointments: AppointmentWithRelations[];
  currentWeek: Date;
};

export function CalendarGrid({
  appointments,
  currentWeek,
}: CalendarGridProps) {
  const slots = getTimeSlots();

  return (
    <div className="grid flex-1 grid-cols-5">
      {Array.from({ length: 5 }).map((_, dayIndex) => (
        <div
          key={dayIndex}
          className="relative border-r last:border-r-0"
        >
          {slots.map((slot) => (
            <div
              key={slot.index}
              className="h-10 border-b"
            />
          ))}
        </div>
      ))}
    </div>
  );
}