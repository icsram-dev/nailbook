"use client";

import { useFormContext } from "react-hook-form";

import type { BookingFormValues } from "@/schemas/booking";

export default function DatePicker() {
  const {
    watch,
    setValue,
  } = useFormContext<BookingFormValues>();

  const serviceId = watch("serviceId");
  const date = watch("date");

  return (
    <div className="rounded-xl border p-5">
      <h3 className="mb-4 font-semibold">
        2. Válassz napot
      </h3>

      <input
        type="date"
        disabled={!serviceId}
        value={date ? date.toISOString().split("T")[0] : ""}
        onChange={(e) => {
          if (!e.target.value) return;

          const [year, month, day] = e.target.value
            .split("-")
            .map(Number);

          setValue("date", new Date(year, month - 1, day));
          setValue("slot", "");
        }}
        className="w-full rounded-lg border p-2"
      />
    </div>
  );
}