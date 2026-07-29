"use client";

import { useMemo } from "react";

import { useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form";

import { useServices } from "@/hooks/useServices";

import type { BookingFormValues } from "@/schemas/booking";

type BookingSummaryProps = {
  isPending: boolean;
};

export default function BookingSummary({
  isPending,
}: BookingSummaryProps) {
  const { data: session } = useSession();

  const { watch } = useFormContext<BookingFormValues>();

  const serviceId = watch("serviceId");
  const date = watch("date");
  const slot = watch("slot");
  const note = watch("note");

  const canSubmit =
    Boolean(serviceId) &&
    Boolean(date) &&
    Boolean(slot);

  const { data: services } = useServices();

  const service = useMemo(
    () => services?.find((item) => item.id === serviceId),
    [services, serviceId]
  );

  return (
    <div className="rounded-xl border p-6">
      <h3 className="mb-6 text-lg font-semibold">
        5. Foglalás összegzése
      </h3>

      <div className="space-y-5">
        <div>
          <p className="text-sm text-muted-foreground">
            Szolgáltatás
          </p>

          <p className="font-medium">
            {service?.name ?? "-"}
          </p>

          {service?.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {service.description}
            </p>
          )}

          {service && (
            <p className="text-sm text-muted-foreground">
              {service.duration} perc •{" "}
              {service.price.toLocaleString("hu-HU")} Ft
            </p>
          )}
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Dátum
          </p>

          <p className="font-medium">
            {date
              ? date.toLocaleDateString("hu-HU")
              : "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Időpont
          </p>

          <p className="font-medium">
            {slot
              ? new Date(slot).toLocaleTimeString("hu-HU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "-"}
          </p>
        </div>

        <hr />

        <div>
          <p className="text-sm text-muted-foreground">
            Foglaló
          </p>

          <p className="font-medium">
            {session?.user?.name}
          </p>

          <p className="text-sm">
            {session?.user?.email}
          </p>

          <p className="text-sm">
            {session?.user?.phone}
          </p>
        </div>

        <hr />

        <div>
          <p className="text-sm text-muted-foreground">
            Megjegyzés
          </p>

          <p className="text-sm whitespace-pre-wrap">
            {note || "Nincs megadva."}
          </p>
        </div>

        {canSubmit && (
          <>
            <hr />

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending
                ? "Foglalás folyamatban..."
                : "Foglalás véglegesítése"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}