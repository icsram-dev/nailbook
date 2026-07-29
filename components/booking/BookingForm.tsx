"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateAppointment } from "@/hooks/useCreateAppointment";

import {
  bookingSchema,
  type BookingFormValues,
} from "@/schemas/booking";

import ServiceSelect from "./ServiceSelect";
import DatePicker from "./DatePicker";
import TimeSlots from "./TimeSlots";
import BookingNote from "./BookingNote";
import BookingSummary from "./BookingSummary";

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createAppointment = useCreateAppointment();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceId: "",
      date: undefined,
      slot: "",
      note: "",
    },
  });

  const selectedService = searchParams.get("service");

  useEffect(() => {
    if (!selectedService) return;

    form.setValue("serviceId", selectedService);
  }, [selectedService, form]);

  async function onSubmit(data: BookingFormValues) {
    try {
      await createAppointment.mutateAsync({
        serviceId: data.serviceId,
        startTime: new Date(data.slot),
        note: data.note,
      });

      router.push("/appointments");
    } catch (error) {
      console.error("Foglalás sikertelen:", error);
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-xl border bg-white p-6 shadow-sm"
      >
        <div>
          <h2 className="text-xl font-semibold">
            Új időpont foglalása
          </h2>

          <p className="text-sm text-muted-foreground">
            Kövesd az alábbi lépéseket.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-medium">
            1. Válassz szolgáltatást
          </h3>

          <ServiceSelect />
        </div>

        <DatePicker />

        <TimeSlots />

        <BookingNote />

        <BookingSummary
          isPending={createAppointment.isPending}
        />
      </form>
    </FormProvider>
  );
}