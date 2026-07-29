"use client";

import { useFormContext } from "react-hook-form";

import { useServices } from "@/hooks/useServices";

import type { BookingFormValues } from "@/schemas/booking";

export default function ServiceSelect() {
  const {
    watch,
    setValue,
    resetField,
  } = useFormContext<BookingFormValues>();

  const serviceId = watch("serviceId");

  const {
    data: services,
    isPending,
    error,
  } = useServices();

  if (isPending) {
    return <p>Szolgáltatások betöltése...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">
        Nem sikerült betölteni a szolgáltatásokat.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {services?.map((service) => {
        const selected = serviceId === service.id;

        return (
          <button
            key={service.id}
            type="button"
            onClick={() => {
              setValue("serviceId", service.id);
              resetField("date");
              resetField("slot");
            }}
            className={`rounded-xl border p-5 text-left transition ${
              selected
                ? "border-blue-600 bg-blue-50"
                : "hover:border-blue-300"
            }`}
          >
            <h3 className="text-lg font-semibold">
              {service.name}
            </h3>

            {service.description && (
              <p className="mt-2 text-sm text-gray-600">
                {service.description}
              </p>
            )}

            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>{service.duration} perc</span>

              <span>
                {service.price.toLocaleString("hu-HU")} Ft
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}