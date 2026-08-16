"use client";

import { useMemo } from "react";

import { useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form";

import { useServices } from "@/hooks/useServices";

import type { BookingFormValues } from "@/schemas/booking";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";

type BookingSummaryProps = {
  isPending: boolean;
};

export default function BookingSummary({ isPending }: BookingSummaryProps) {
  const { data: session } = useSession();

  const { watch } = useFormContext<BookingFormValues>();

  const serviceId = watch("serviceId");
  const date = watch("date");
  const slot = watch("slot");
  const note = watch("note");

  const { data: services } = useServices();

  const service = useMemo(
    () => services?.find((item) => item.id === serviceId),
    [services, serviceId]
  );

  const canSubmit = Boolean(serviceId) && Boolean(date) && Boolean(slot);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Foglalás összegzése</CardTitle>

        <CardDescription>Ellenőrizd az adatokat a foglalás előtt.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">Szolgáltatás</p>

          <p className="mt-1 font-semibold">{service?.name ?? "-"}</p>

          {service?.description && (
            <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
          )}

          {service && (
            <p className="mt-2 text-sm text-muted-foreground">
              {service.duration} perc • {service.price.toLocaleString("hu-HU")} Ft
            </p>
          )}
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground">Dátum</p>

          <p className="mt-1 font-medium">{date ? date.toLocaleDateString("hu-HU") : "-"}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Időpont</p>

          <p className="mt-1 font-medium">
            {slot
              ? new Date(slot).toLocaleTimeString("hu-HU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "-"}
          </p>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground">Foglaló</p>

          <p className="mt-1 font-medium">{session?.user?.name ?? "-"}</p>

          <p className="text-sm">{session?.user?.email}</p>

          {session?.user?.phone && <p className="text-sm">{session.user.phone}</p>}
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground">Megjegyzés</p>

          <p className="mt-1 whitespace-pre-wrap text-sm">{note || "Nincs megadva."}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Fizetendő</span>

          <span className="text-2xl font-bold">
            {service ? `${service.price.toLocaleString("hu-HU")} Ft` : "-"}
          </span>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={!canSubmit || isPending}>
          {isPending ? "Foglalás folyamatban..." : "Foglalás véglegesítése"}
        </Button>
      </CardContent>
    </Card>
  );
}
