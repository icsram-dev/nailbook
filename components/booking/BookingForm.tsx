"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Clock3 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useCreateAppointment } from "@/hooks/useCreateAppointment";
import { useServices } from "@/hooks/useServices";

import {
  bookingSchema,
  type BookingFormValues,
} from "@/schemas/booking";

import DatePicker from "./BookingCalendar";
import TimeSlots from "./TimeSlots";
import BookingNote from "./BookingNote";
import BookingSummary from "./BookingSummary";

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createAppointment = useCreateAppointment();
  const { data: services } = useServices();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceId: "",
      date: undefined,
      slot: "",
      note: "",
    },
  });

  const selectedServiceId = searchParams.get("service");

  const selectedService = services?.find(
    (service) => service.id === selectedServiceId
  );

  useEffect(() => {
    if (!selectedServiceId) return;

    form.setValue("serviceId", selectedServiceId, {
      shouldValidate: true,
    });
  }, [selectedServiceId, form]);

  async function onSubmit(data: BookingFormValues) {
    try {
      await createAppointment.mutateAsync({
        serviceId: data.serviceId,
        startTime: new Date(data.slot),
        note: data.note,
      });

      toast.success("Sikeresen lefoglaltad az időpontot.");

      router.push("/booking/success");
      router.refresh();
    } catch (error) {
      console.error("Foglalás sikertelen:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Nem sikerült lefoglalni az időpontot."
      );
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10"
      >
        {/* Fejléc */}
        <div>
          <h2 className="text-3xl font-semibold">
            Időpontfoglalás
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Válaszd ki a számodra megfelelő napot és időpontot.
          </p>
        </div>

        {/* Kiválasztott szolgáltatás */}
        {selectedService && (
          <div className="rounded-2xl border border-pink-100 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-4">
              {selectedService.image && (
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-pink-600">
                  Kiválasztott szolgáltatás
                </p>

                <h3 className="mt-1 text-lg font-semibold text-gray-900">
                  {selectedService.name}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span>
                    {selectedService.price.toLocaleString("hu-HU")} Ft
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock3 className="h-4 w-4" />
                    {selectedService.duration} perc
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dátum */}
        <DatePicker />

        {/* Időpont */}
        <TimeSlots />

        {/* Megjegyzés */}
        <BookingNote />

        {/* Összegzés + foglalás */}
        <BookingSummary
          isPending={createAppointment.isPending}
        />
      </form>
    </FormProvider>
  );
}