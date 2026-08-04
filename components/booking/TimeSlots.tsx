"use client";

import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import {
  getAvailability,
  TimeSlot,
} from "@/lib/api/availability";

import type { BookingFormValues } from "@/schemas/booking";

export default function TimeSlots() {
  const {
    watch,
    setValue,
  } = useFormContext<BookingFormValues>();

  const serviceId = watch("serviceId");
  const date = watch("date");
  const selectedSlot = watch("slot");

  const {
    data: slots = [],
    isPending,
    error,
  } = useQuery<TimeSlot[]>({
    queryKey: [
      "availability",
      serviceId,
      date?.toISOString(),
    ],
    queryFn: async () => {
      if (!date) {
        return [];
      }

      return getAvailability({
        serviceId,
        date,
      });
    },
    enabled: Boolean(serviceId && date),
  });

  return (
    <div className="rounded-xl border p-5">
      <h3 className="mb-2 font-semibold">
        3. Válassz időpontot
      </h3>

      {!serviceId || !date ? (
        <p className="text-sm text-muted-foreground">
          Először válassz szolgáltatást és dátumot.
        </p>
      ) : isPending ? (
        <p className="text-sm text-muted-foreground">
          Szabad időpontok betöltése...
        </p>
      ) : error ? (
        <p className="text-sm text-red-500">
          Nem sikerült lekérni a szabad időpontokat.
        </p>
      ) : slots.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Erre a napra már nincs foglalható időpont.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {slots.map((item) => {
            const selected =
              selectedSlot === item.startTime;

            return (
              <button
                key={item.startTime}
                type="button"
                onClick={() =>
                  setValue("slot", item.startTime, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }
                className={`rounded-lg border px-4 py-2 text-sm transition ${
                  selected
                    ? "border-pink-600 bg-pink-50 text-pink-700"
                    : "hover:border-pink-400 hover:bg-pink-50"
                }`}
              >
                {new Date(item.startTime).toLocaleTimeString(
                  "hu-HU",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}