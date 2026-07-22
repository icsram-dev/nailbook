"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Appointment,
  Service,
  User,
} from "@prisma/client";

import {
  appointmentSchema,
  type AppointmentInput,
  type AppointmentData,
} from "@/lib/validations/appointment";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type AppointmentFormProps = {
  appointment?: Appointment | null;
  customers: User[];
  services: Service[];
  onSubmit: (
    data: AppointmentData
  ) => void | Promise<void>;
};

export function AppointmentForm({
  appointment,
  customers,
  services,
  onSubmit,
}: AppointmentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<
    AppointmentInput,
    unknown,
    AppointmentData
  >({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      customerId: "",
      serviceId: "",
      startTime: new Date(),
      note: "",
    },
  });

  useEffect(() => {
    if (appointment) {
      reset({
        customerId: appointment.customerId,
        serviceId: appointment.serviceId,
        startTime: appointment.startTime,
        note: appointment.note ?? "",
      });
    } else {
      reset({
        customerId: "",
        serviceId: "",
        startTime: new Date(),
        note: "",
      });
    }
  }, [appointment, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          Vendég
        </label>

        <select
          {...register("customerId")}
          className="w-full rounded-md border p-2"
        >
          <option value="">
            Válassz vendéget...
          </option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.name}
            </option>
          ))}
        </select>

        {errors.customerId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.customerId.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Szolgáltatás
        </label>

        <select
          {...register("serviceId")}
          className="w-full rounded-md border p-2"
        >
          <option value="">
            Válassz szolgáltatást...
          </option>

          {services.map((service) => (
            <option
              key={service.id}
              value={service.id}
            >
              {service.name}
            </option>
          ))}
        </select>

        {errors.serviceId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.serviceId.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Kezdés
        </label>

        <Input
          type="datetime-local"
          {...register("startTime", {
            valueAsDate: true,
          })}
        />

        {errors.startTime && (
          <p className="mt-1 text-sm text-red-500">
            {errors.startTime.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Megjegyzés
        </label>

        <Textarea
          rows={4}
          {...register("note")}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {appointment
          ? "Mentés"
          : "Foglalás létrehozása"}
      </Button>
    </form>
  );
}