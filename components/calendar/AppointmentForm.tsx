"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type AppointmentFormProps = {
  selectedDate: string | null;
  onSuccess: () => void;
  onCancel: () => void;
};

type Customer = {
  id: string;
  name: string;
};

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
};

export function AppointmentForm({
  selectedDate,
  onSuccess,
  onCancel,
}: AppointmentFormProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [serviceId, setServiceId] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/appointments/form-data");

        if (!res.ok) {
          throw new Error("Nem sikerült betölteni az adatokat.");
        }

        const data = await res.json();

        setCustomers(data.customers);
        setServices(data.services);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  const selectedService = services.find(
    (service) => service.id === serviceId
  );

  const endDate = (() => {
    if (!selectedDate || !selectedService) return null;

    const date = new Date(selectedDate);
    date.setMinutes(date.getMinutes() + selectedService.duration);

    return date;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !customerId || !serviceId) {
      alert("Minden mező kitöltése kötelező!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          serviceId,
          startTime: selectedDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Hiba történt.");
      }

      onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ismeretlen hiba történt.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {selectedDate && (
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Kezdési idő
          </label>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
            {new Date(selectedDate).toLocaleString("hu-HU")}
          </div>
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Vendég
        </label>

        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3"
        >
          <option value="">Válassz vendéget...</option>

          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Szolgáltatás
        </label>

        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3"
        >
          <option value="">Válassz szolgáltatást...</option>

          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      {selectedService && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Időtartam
              </label>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                {selectedService.duration} perc
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Ár
              </label>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                {selectedService.price.toLocaleString("hu-HU")} Ft
              </div>
            </div>
          </div>

          {endDate && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Befejezési idő
              </label>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                {endDate.toLocaleString("hu-HU")}
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600"
        >
          Mégse
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? "Mentés..." : "Mentés"}
        </Button>
      </div>
    </form>
  );
}