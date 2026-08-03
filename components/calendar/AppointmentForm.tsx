"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type AppointmentFormProps = {
  selectedDate: string | null;
  appointmentId: string | null;
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
  description: string | null;
  duration: number;
  price: number;
};

export function AppointmentForm({
  selectedDate,
  appointmentId,
  onSuccess,
  onCancel,
}: AppointmentFormProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [customer, setCustomer] = useState<{
  name: string;
  email: string;
  phone: string;
} | null>(null);

  const [customerId, setCustomerId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [customerNote, setCustomerNote] = useState("");
const [internalNote, setInternalNote] = useState("");
  const [status, setStatus] = useState("CONFIRMED");

  const [loading, setLoading] = useState(false);

  const isEditMode = !!appointmentId;

 const startTime =
  date && time
    ? new Date(`${date}T${time}:00`).toISOString()
    : null;

useEffect(() => {
  if (!selectedDate || appointmentId) return;

  const start = new Date(selectedDate);

  setDate(start.toISOString().split("T")[0]);

  setTime(
    start.toLocaleTimeString("hu-HU", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}, [selectedDate, appointmentId]);

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

  useEffect(() => {
    if (!appointmentId) {
      return;
    }


    async function loadAppointment() {
      try {
        const res = await fetch(`/api/appointments/${appointmentId}`);

        if (!res.ok) {
          throw new Error("Nem sikerült betölteni a foglalást.");
        }

       const appointment = await res.json();

setCustomer(appointment.customer);

setCustomerId(appointment.customerId);
setServiceId(appointment.serviceId);
       
        const start = new Date(appointment.startTime);

setDate(start.toISOString().split("T")[0]);

setTime(
  start.toLocaleTimeString("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
  })
);
        setStatus(appointment.status);
      } catch (error) {
        console.error(error);
      }
    }

    void loadAppointment();
  }, [appointmentId]);

  const selectedService = services.find((service) => service.id === serviceId);

  const endDate = (() => {
    if (!startTime || !selectedService) return null;

    const date = new Date(startTime);
    date.setMinutes(date.getMinutes() + selectedService.duration);

    return date;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startTime || !customerId || !serviceId) {
      alert("Minden mező kitöltése kötelező!");
      return;
    }

    const url = isEditMode
      ? `/api/appointments/${appointmentId}`
      : "/api/appointments";

    const method = isEditMode ? "PUT" : "POST";

    try {
      setLoading(true);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
  customerId,
  serviceId,
  startTime,
  status,
  customerNote,
  internalNote,
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
      {isEditMode && customer && (
  <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5">
    <h3 className="text-lg font-semibold text-gray-900">
      {customer.name}
    </h3>

    <div className="mt-3 space-y-2 text-sm text-gray-600">
      <div>📞 {customer.phone}</div>
      <div>✉️ {customer.email}</div>
    </div>
  </div>
)}
      {startTime && (
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Kezdési idő
          </label>
        

         <div className="grid grid-cols-2 gap-4">
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      Dátum
    </label>

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="w-full rounded-xl border border-gray-300 p-3"
    />
  </div>

  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      Kezdés
    </label>

    <input
      type="time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      className="w-full rounded-xl border border-gray-300 p-3"
    />
  </div>
</div>
        </div>
      )}

      <div>
      {!isEditMode && (
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
)}
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
  {service.description ? ` – ${service.description}` : ""}
</option>
          ))}
        </select>
      </div>
      <div>
  <label className="mb-1 block text-sm font-medium text-gray-700">
    Vendég megjegyzése
  </label>

  <textarea
    value={customerNote}
    onChange={(e) => setCustomerNote(e.target.value)}
    rows={3}
    className="w-full rounded-xl border border-gray-300 p-3"
    placeholder="A vendég által megadott megjegyzés..."
  />
</div>

<div>
  <label className="mb-1 block text-sm font-medium text-gray-700">
    Belső megjegyzés
  </label>

  <textarea
    value={internalNote}
    onChange={(e) => setInternalNote(e.target.value)}
    rows={3}
    className="w-full rounded-xl border border-gray-300 p-3"
    placeholder="Csak az admin látja..."
  />
</div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Státusz
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3"
        >
          <option value="CONFIRMED">Megerősítve</option>
          <option value="COMPLETED">Teljesítve</option>
          <option value="CANCELLED">Lemondva</option>
          <option value="NO_SHOW">Nem jelent meg</option>
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
                {endDate.toLocaleTimeString("hu-HU", {
  hour: "2-digit",
  minute: "2-digit",
})}
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
          {loading ? "Mentés..." : isEditMode ? "Módosítás" : "Mentés"}
        </Button>
      </div>
    </form>
  );
}
