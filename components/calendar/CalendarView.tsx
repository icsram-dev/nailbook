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
}: Props) {
  const [currentWeek, setCurrentWeek] =
    useState(new Date());

  return (
    <>
      <WeekNavigator
        currentWeek={currentWeek}
        onPrevious={() =>
          setCurrentWeek((prev) => addWeeks(prev, -1))
        }
        onNext={() =>
          setCurrentWeek((prev) => addWeeks(prev, 1))
        }
        onToday={() => setCurrentWeek(new Date())}
      />

      <WeeklyCalendar
        currentWeek={currentWeek}
        appointments={appointments}
        onAppointmentClick={() => {
          // TODO: Foglalás részleteinek megnyitása
        }}
      />
    </>
  );
}