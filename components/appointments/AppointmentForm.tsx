"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Appointment, Service, User } from "@prisma/client";

import { appointmentSchema, AppointmentFormValues } from "@/lib/validations/appointment";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type AppointmentFormProps = {
  appointment?: Appointment | null;
  customers: User[];
  services: Service[];
  onSubmit: (data: AppointmentFormValues) => void | Promise<void>;
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
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      customerId: "",
      serviceId: "",
      date: "",
      time: "",
      note: "",
    },
  });

  useEffect(() => {
    if (appointment) {
      reset({
        customerId: appointment.customerId,
        serviceId: appointment.serviceId,
        date: appointment.startTime.toISOString().slice(0, 10),
        time: appointment.startTime.toTimeString().slice(0, 5),
        note: appointment.customerNote ?? "",
      });
    } else {
      reset({
        customerId: "",
        serviceId: "",
        date: "",
        time: "",
        note: "",
      });
    }
  }, [appointment, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Vendég</label>

        <select {...register("customerId")} className="w-full rounded-md border p-2">
          <option value="">Válassz vendéget...</option>

          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.lastName} {customer.firstName}
            </option>
          ))}
        </select>

        {errors.customerId && (
          <p className="mt-1 text-sm text-red-500">{errors.customerId.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Szolgáltatás</label>

        <select {...register("serviceId")} className="w-full rounded-md border p-2">
          <option value="">Válassz szolgáltatást...</option>

          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>

        {errors.serviceId && (
          <p className="mt-1 text-sm text-red-500">{errors.serviceId.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Dátum</label>

        <Input type="date" {...register("date")} />

        {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Időpont</label>

        <Input type="time" {...register("time")} />

        {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Megjegyzés</label>

        <Textarea rows={4} {...register("note")} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {appointment ? "Mentés" : "Foglalás létrehozása"}
      </Button>
    </form>
  );
}
