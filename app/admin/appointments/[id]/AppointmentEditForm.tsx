"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  appointmentSchema,
  AppointmentFormValues,
} from "@/lib/validation/appointment";

type Props = {
  appointment: {
    id: string;
    customer: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
    };
    service: {
      id: string;
      name: string;
    };
    startTime: Date;
    note: string | null;
  };

  services: {
    id: string;
    name: string;
    price: number;
    duration: number;
  }[];
};

export default function AppointmentEditForm({
  appointment,
  services,
}: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),

    defaultValues: {
      customerId: appointment.customer.id,
      serviceId: appointment.service.id,
      date: appointment.startTime
        .toISOString()
        .slice(0, 10),
      time: appointment.startTime
        .toTimeString()
        .slice(0, 5),
      note: appointment.note ?? "",
    },
  });

  async function onSubmit(data: AppointmentFormValues) {
    const payload = {
      ...data,
      customerId: appointment.customer.id,
    };

    try {
      const response = await fetch(
        `/api/admin/appointments/${appointment.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.error ?? "Nem sikerült a mentés.");
        return;
      }

      router.push("/admin/appointments");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Váratlan hiba történt.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border bg-white p-8 shadow-sm"
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Vendég
          </label>

          <div className="rounded-xl border bg-gray-50 p-4">
            <p className="font-semibold text-gray-900">
              👤 {appointment.customer.name}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              📧 {appointment.customer.email}
            </p>

            {appointment.customer.phone && (
              <p className="mt-1 text-sm text-gray-600">
                📞 {appointment.customer.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Szolgáltatás
          </label>

          <select
            {...register("serviceId")}
            className="w-full rounded-xl border p-3"
          >
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
          <label className="mb-2 block text-sm font-medium">
            Dátum
          </label>

          <input
            type="date"
            {...register("date")}
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

        <div>
          <label className="mb-2 block text-sm font-medium">
            Megjegyzés
          </label>

          <textarea
            {...register("note")}
            rows={4}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-pink-600 px-6 py-3 text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Mentés..." : "Mentés"}
        </button>
      </div>
    </form>
  );
}