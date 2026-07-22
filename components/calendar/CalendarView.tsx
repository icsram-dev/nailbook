"use client";

import { useState } from "react";
import { addWeeks } from "date-fns";

import { WeekNavigator } from "./WeekNavigator";
import { WeeklyCalendar } from "./WeeklyCalendar";

import { Appointment, Service, User } from "@prisma/client";

type AppointmentWithRelations =
  Appointment & {
    customer: User;
    service: Service;
  };

type Props = {
  appointments: AppointmentWithRelations[];
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
      />
    </>
  );
}