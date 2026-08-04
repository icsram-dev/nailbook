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

type TimeSlot = {
  start: string;
  end: string;
  available: boolean;
};

export default function BookingCalendar() {
  const { watch, setValue } =
    useFormContext<BookingFormValues>();

  const serviceId = watch("serviceId");
  const selectedDate = watch("date");
  const selectedSlot = watch("slot");

  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
const [loadingSlots, setLoadingSlots] = useState(false);

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

  useEffect(() => {
  async function loadSlots() {
    if (!serviceId || !selectedDate) {
      setSlots([]);
      return;
    }

    try {
      setLoadingSlots(true);

      const params = new URLSearchParams({
        serviceId,
        date: selectedDate.toISOString(),
      });

      const response = await fetch(
        `/api/booking/slots?${params}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setSlots(data);
    } catch (error) {
      console.error(error);
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }

  loadSlots();
}, [serviceId, selectedDate]);

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
  <div className="space-y-6">
    <div>
      <h2 className="text-lg font-semibold">
        2. Válassz napot
      </h2>

      <p className="text-sm text-muted-foreground">
        Csak a foglalható napok választhatók ki.
      </p>
    </div>

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

        setValue("slot", "", {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }}
      className="rounded-lg border"
    />

    <div className="space-y-3">
      <h3 className="font-medium">
        Elérhető időpontok
      </h3>

      {loadingSlots && (
        <p className="text-sm text-muted-foreground">
          Betöltés...
        </p>
      )}

     {serviceId && selectedDate && !loadingSlots && slots.length === 0 && (
  <p className="text-sm text-muted-foreground">
    Erre a napra nincs szabad időpont.
  </p>
)}

      <div className="grid grid-cols-3 gap-2">
        {slots
          .filter((slot) => slot.available)
          .map((slot) => (
            <button
              key={slot.start}
              type="button"
              onClick={() =>
                setValue("slot", slot.start, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                })
              }
              className={`rounded-lg border p-2 text-sm transition ${
  selectedSlot === slot.start
    ? "border-pink-600 bg-pink-100 text-pink-700"
    : "hover:border-pink-500 hover:bg-pink-50"
}`}
            >
              {new Date(slot.start).toLocaleTimeString(
                "hu-HU",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </button>
          ))}
      </div>
    </div>
  </div>
);
}