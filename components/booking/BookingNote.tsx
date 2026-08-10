"use client";

import { useFormContext } from "react-hook-form";

import type { BookingFormValues } from "@/schemas/booking";

export default function BookingNote() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookingFormValues>();

  return (
    <div className="rounded-xl border p-5">
      <h3 className="mb-6 font-semibold">
        3. Megjegyzés
      </h3>

      <p className="mb-4 text-sm text-muted-foreground">
        Ha szeretnél valamit előre jelezni (pl. javítás, díszítés vagy egyéb kérés),
        itt megteheted.
      </p>

      <textarea
        rows={4}
        placeholder="Írj ide megjegyzést..."
        {...register("note")}
        className="w-full rounded-lg border p-3 outline-none transition focus:border-pink-500"
      />

      {errors.note && (
        <p className="mt-1 text-sm text-red-500">
          {errors.note.message}
        </p>
      )}
    </div>
  );
}