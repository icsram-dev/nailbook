"use client";

import { Clock3, CheckCircle2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { useServices } from "@/hooks/useServices";

import type { BookingFormValues } from "@/schemas/booking";

import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function ServiceSelect() {
  const { watch, setValue, resetField } =
    useFormContext<BookingFormValues>();

  const serviceId = watch("serviceId");

  const {
    data: services,
    isPending,
    error,
  } = useServices();

  if (isPending) {
    return <LoadingState rows={4} />;
  }

  if (error) {
    return (
      <ErrorState
        title="Nem sikerült betölteni a szolgáltatásokat"
        description="Próbáld meg később újra."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {services?.map((service) => {
        const selected = serviceId === service.id;

        return (
          <Card
            key={service.id}
            onClick={() => {
              setValue("serviceId", service.id);
              resetField("date");
              resetField("slot");
            }}
            className={[
              "cursor-pointer transition-all duration-200",
              "hover:-translate-y-0.5 hover:shadow-md",
              selected &&
                "border-primary ring-primary/20 ring-2",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <button
              type="button"
              className="flex h-full w-full flex-col p-6 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">
                    {service.name}
                  </h3>

                  {service.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  )}
                </div>

                {selected && (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                )}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Badge variant="secondary">
                  {service.price.toLocaleString("hu-HU")} Ft
                </Badge>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock3 className="h-4 w-4" />
                  {service.duration} perc
                </div>
              </div>
            </button>
          </Card>
        );
      })}
    </div>
  );
}