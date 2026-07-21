"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  appointmentSchema,
  AppointmentFormValues,
} from "@/lib/validations/appointment";

type Customer = {
  id: string;
  name: string | null;
};

type Service = {
  id: string;
  name: string;
  price: number;
};

type Props = {
  customers: Customer[];
  services: Service[];
};

export default function AppointmentForm({
  customers,
  services,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormValues) => {
  const response = await fetch("/api/admin/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    alert("Nem sikerült létrehozni a foglalást.");
    return;
  }

  alert("Foglalás sikeresen létrehozva!");
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border bg-white p-8 shadow-sm"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Vendég
        </label>

        <select
          {...register("customerId")}
          className="w-full rounded-xl border p-3"
        >
          <option value="">-- Válassz vendéget --</option>

          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
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
        <label className="mb-2 block text-sm font-medium">
          Szolgáltatás
        </label>

        <select
          {...register("serviceId")}
          className="w-full rounded-xl border p-3"
        >
          <option value="">-- Válassz szolgáltatást --</option>

          {services.map((service) => (
            <option key={service.id} value={service.id}>
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

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Dátum
          </label>

          <input
  type="number"
  {...register("price", {
    valueAsNumber: true,
  })}
  className="w-full rounded-xl border p-3"
/>

          {errors.date && (
            <p className="mt-1 text-sm text-red-500">
              {errors.date.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Időpont
          </label>

          <input
            type="time"
            {...register("time")}
            className="w-full rounded-xl border p-3"
          />

          {errors.time && (
            <p className="mt-1 text-sm text-red-500">
              {errors.time.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Ár
        </label>

        <input
          type="number"
          {...register("price")}
          className="w-full rounded-xl border p-3"
        />

        {errors.price && (
          <p className="mt-1 text-sm text-red-500">
            {errors.price.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Megjegyzés
        </label>

        <textarea
          rows={4}
          {...register("note")}
          className="w-full rounded-xl border p-3"
        />

        {errors.note && (
          <p className="mt-1 text-sm text-red-500">
            {errors.note.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-xl bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700"
      >
        Mentés
      </button>
    </form>
  );
}