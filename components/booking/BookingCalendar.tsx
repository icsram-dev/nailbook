"use client";

import { useEffect, useState } from "react";
import { hu } from "date-fns/locale";
import { useFormContext } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
import { isBookableDate } from "@/lib/booking/booking-rules";
import type { BookingFormValues } from "@/schemas/booking";

type Vacation = {
  id: string;
  startDate: string;
  endDate: string;
};

export default function BookingCalendar() {
  const { watch, setValue } = useFormContext<BookingFormValues>();

  const serviceId = watch("serviceId");
  const selectedDate = watch("date");

  const [vacations, setVacations] = useState<Vacation[]>([]);

  useEffect(() => {
    async function loadVacations() {
      try {
        const response = await fetch("/api/vacations");

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        setVacations(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadVacations();
  }, []);

  function isVacation(date: Date) {
    return vacations.some((vacation) => {
      const start = new Date(vacation.startDate);
      const end = new Date(vacation.endDate);

      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      return date >= start && date <= end;
    });
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl text-stone-800">2. Válassz napot</h2>

        <p className="text-sm text-muted-foreground">Csak a foglalható napok választhatók ki.</p>
      </div>

      <div className="overflow-x-auto">
        <Calendar
          locale={hu}
          mode="single"
          selected={selectedDate}
          disabled={(date) =>
            !serviceId ||
            !isBookableDate(date, {
              isAdmin: false,
            }) ||
            isVacation(date)
          }
          modifiers={{
            vacation: (date) => isVacation(date),
          }}
          onSelect={(date) => {
            if (!date) return;

            setValue("date", date, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });

            // Új dátum választásakor töröljük a korábban kiválasztott időpontot
            setValue("slot", "", {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
          }}
          className="mx-auto w-fit rounded-2xl border border-stone-200 bg-[#fffdfa] p-2 sm:p-3"
        />
      </div>
    </div>
  );
}
