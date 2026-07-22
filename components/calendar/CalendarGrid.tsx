import {
  Appointment,
  Service,
  User,
} from "@prisma/client";

import {
  getAppointmentsForDay,
  getAppointmentHeight,
  getMinutesFromStart,
  getTimeSlots,
  getWeekDays,
} from "@/lib/calendar";

import { AppointmentCard } from "./AppointmentCard";

type AppointmentWithRelations =
  Appointment & {
    customer: User;
    service: Service;
  };

type CalendarGridProps = {
  appointments: AppointmentWithRelations[];
  currentWeek: Date;
  onAppointmentClick: (
    appointment: AppointmentWithRelations
  ) => void;
};

export function CalendarGrid({
  appointments,
  currentWeek,
  onAppointmentClick,
}: CalendarGridProps) {
  const slots = getTimeSlots();
  const days = getWeekDays(currentWeek);

  return (
    <div className="grid flex-1 grid-cols-5">
      {days.map((day) => {
        const dayAppointments = getAppointmentsForDay(
          appointments,
          day
        );

        return (
          <div
            key={day.toISOString()}
            className="relative border-r last:border-r-0"
          >
            {slots.map((slot) => (
              <div
                key={slot.index}
                className="h-10 border-b"
              />
            ))}

            {dayAppointments.map((appointment) => {
              const duration =
                (appointment.endTime.getTime() -
                  appointment.startTime.getTime()) /
                60000;

              return (
                <div
                  key={appointment.id}
                  className="absolute left-0 right-0 px-1"
                  style={{
                    top: getMinutesFromStart(
                      appointment.startTime
                    ),
                    height: getAppointmentHeight(
                      duration
                    ),
                  }}
                >
                  <AppointmentCard
                    appointment={appointment}
                    onClick={() =>
                      onAppointmentClick(appointment)
                    }
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}