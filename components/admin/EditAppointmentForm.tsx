"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AppointmentStatus, User, Service } from "@prisma/client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import { toast } from "sonner";

type Appointment = {
  id: string;
  customerId: string;
  serviceId: string;
  startTime: string;
  customerNote: string | null;
  status: AppointmentStatus;
};

type Props = {
  appointment: Appointment;
  customers: User[];
  services: Service[];
};

export default function EditAppointmentForm({ appointment, customers, services }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [customerId, setCustomerId] = useState(appointment.customerId);

  const [serviceId, setServiceId] = useState(appointment.serviceId);

  const [startTime, setStartTime] = useState(appointment.startTime.slice(0, 16));

  const [status, setStatus] = useState(appointment.status);

  const [note, setNote] = useState(appointment.customerNote ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/appointments/${appointment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          serviceId,
          startTime,
          status,
          note,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Foglalás sikeresen frissítve.");

      router.push(`/admin/appointments/${appointment.id}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Hiba történt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Foglalás szerkesztése</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">Vendég</label>

            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.lastName} {customer.firstName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Szolgáltatás</label>

            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Időpont</label>

            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Státusz</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as AppointmentStatus)}
              className="w-full rounded-lg border p-3"
            >
              {Object.values(AppointmentStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Megjegyzés</label>

            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Mégse
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Mentés..." : "Mentés"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
