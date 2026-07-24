import {
  Appointment,
  Service,
  User,
} from "@prisma/client";

import { Calendar } from "./Calendar";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";
import { TimeColumn } from "./TimeColumn";

type AppointmentWithRelations =
  Appointment & {
    customer: User;
    service: Service;
  };

type WeeklyCalendarProps = {
  currentWeek: Date;
  appointments: AppointmentWithRelations[];

  startHour?: number;
  endHour?: number;

  onAppointmentClick: (
    appointment: AppointmentWithRelations
  ) => void;
};

export function WeeklyCalendar({
  currentWeek,
  appointments,
  startHour = 8,
  endHour = 17,
  onAppointmentClick,
}: WeeklyCalendarProps) {
  return (
    <Calendar>
      <div className="flex">
        <div className="w-20 border-r bg-gray-50" />

        <CalendarHeader
          currentWeek={currentWeek}
        />
      </div>

      <div className="flex">
        <TimeColumn
          startHour={startHour}
          endHour={endHour}
        />

        <CalendarGrid
          appointments={appointments}
          currentWeek={currentWeek}
          startHour={startHour}
          endHour={endHour}
          onAppointmentClick={
            onAppointmentClick
          }
        />
      </div>
    </Calendar>
  );
}