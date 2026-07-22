"use client";

import { useState } from "react";
import { addWeeks } from "date-fns";
import {
  Appointment,
  Service,
  User,
} from "@prisma/client";

import { WeekNavigator } from "./WeekNavigator";
import { WeeklyCalendar } from "./WeeklyCalendar";

type AppointmentWithRelations =
  Appointment & {
    customer: User;
    service: Service;
  };

type Props = {
  appointments: AppointmentWithRelations[];
  customers: User[];
  services: Service[];
};

export function CalendarView({
  appointments,
  customers,
  services,
}: Props) {
  const [currentWeek, setCurrentWeek] =
    useState(new Date());

  const [
    selectedAppointment,
    setSelectedAppointment,
  ] = useState<AppointmentWithRelations | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  return (
    <>
      <WeekNavigator
        currentWeek={currentWeek}
        onPrevious={() =>
          setCurrentWeek(addWeeks(currentWeek, -1))
        }
        onNext={() =>
          setCurrentWeek(addWeeks(currentWeek, 1))
        }
        onToday={() =>
          setCurrentWeek(new Date())
        }
      />

      <WeeklyCalendar
        currentWeek={currentWeek}
        appointments={appointments}
        onAppointmentClick={(appointment) => {
          setSelectedAppointment(appointment);
          setIsModalOpen(true);
        }}
      />
    </>
  );
}