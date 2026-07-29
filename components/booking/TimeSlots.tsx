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
  const slot = watch("slot");

  const {
    data: slots,
    isPending,
    error,
  } = useQuery<TimeSlot[]>({
    queryKey: ["availability", serviceId, date?.toISOString()],
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

  if (!serviceId || !date) {
    return (
      <div className="rounded-xl border p-5">
        <h3 className="mb-2 font-semibold">
          3. Időpont
        </h3>

        <p className="text-sm text-muted-foreground">
          Először válassz szolgáltatást és dátumot.
        </p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="rounded-xl border p-5">
        <p>Szabad időpontok betöltése...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border p-5">
        <p className="text-red-500">
          Nem sikerült lekérni a szabad időpontokat.
        </p>
      </div>
    );
  }

  if (!slots || slots.length === 0) {
    return (
      <div className="rounded-xl border p-5">
        <h3 className="mb-2 font-semibold">
          3. Időpont
        </h3>

        <p className="text-muted-foreground">
          Erre a napra nincs szabad időpont.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-5">
      <h3 className="mb-4 font-semibold">
        3. Válassz időpontot
      </h3>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {slots.map((item) => {
          const selected = slot === item.startTime;

          return (
            <button
              key={item.startTime}
              type="button"
              onClick={() => setValue("slot", item.startTime)}
              className={`rounded-lg border px-4 py-2 transition ${
                selected
                  ? "border-blue-600 bg-blue-50"
                  : "hover:border-blue-300"
              }`}
            >
              {new Date(item.startTime).toLocaleTimeString("hu-HU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </button>
          );
        })}
      </div>
    </div>
  );
}