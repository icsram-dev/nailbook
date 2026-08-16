"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import SearchInput from "@/components/ui/SearchInput";
import { CancelledAppointment } from "@/types/cancelledAppointment";

type Props = {
  appointments: CancelledAppointment[];
};

type Filter = "ALL" | "CUSTOMER" | "ADMIN";

export default function CancelledAppointmentsTable({ appointments }: Props) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("ALL");

  const filteredAppointments = useMemo(() => {
    const query = search.toLowerCase().trim();

    let filtered = appointments;

    if (query) {
      filtered = filtered.filter((appointment) => {
        return (
          appointment.customerName.toLowerCase().includes(query) ||
          appointment.customerEmail.toLowerCase().includes(query) ||
          appointment.customerPhone.toLowerCase().includes(query) ||
          appointment.serviceName.toLowerCase().includes(query)
        );
      });
    }

    switch (filter) {
      case "CUSTOMER":
        return filtered.filter((appointment) => appointment.cancelledBy === "Vendég");

      case "ADMIN":
        return filtered.filter((appointment) => appointment.cancelledBy === "Admin");

      default:
        return filtered;
    }
  }, [appointments, search, filter]);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Biztosan végleg törölni szeretnéd ezt a lemondott foglalást?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/cancelled/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      router.refresh();
    } catch {
      alert("Nem sikerült törölni a foglalást.");
    }
  }

  return (
    <>
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Keresés vendég, telefonszám, e-mail vagy szolgáltatás alapján..."
      />

      <div className="mb-6 flex gap-2">
        <button
          type="button"
          onClick={() => setFilter("ALL")}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            filter === "ALL" ? "bg-pink-600 text-white" : "border bg-white hover:bg-gray-50"
          }`}
        >
          Összes
        </button>

        <button
          type="button"
          onClick={() => setFilter("CUSTOMER")}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            filter === "CUSTOMER" ? "bg-pink-600 text-white" : "border bg-white hover:bg-gray-50"
          }`}
        >
          👤 Vendég
        </button>

        <button
          type="button"
          onClick={() => setFilter("ADMIN")}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            filter === "ADMIN" ? "bg-pink-600 text-white" : "border bg-white hover:bg-gray-50"
          }`}
        >
          👩‍💼 Admin
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-sm text-gray-500">
              <th className="px-6 py-4">Vendég</th>
              <th className="px-6 py-4">Telefon</th>
              <th className="px-6 py-4">Szolgáltatás</th>
              <th className="px-6 py-4">Időpont</th>
              <th className="px-6 py-4">Lemondta</th>
              <th className="px-6 py-4">Lemondás ideje</th>
              <th className="px-6 py-4 text-center">Művelet</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                  Nincs a keresésnek megfelelő lemondás.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b transition hover:bg-gray-50 last:border-0"
                >
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => router.push(`/admin/customers/${appointment.customerId}`)}
                      className="text-left font-semibold text-pink-600 transition hover:text-pink-700 hover:underline"
                    >
                      {appointment.customerName}
                    </button>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">{appointment.customerPhone}</td>

                  <td className="px-6 py-4">{appointment.serviceName}</td>

                  <td className="whitespace-nowrap px-6 py-4">
                    {appointment.appointmentDate.toLocaleString("hu-HU", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        appointment.cancelledBy === "Admin"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {appointment.cancelledBy === "Admin" ? "👩‍💼 Admin" : "👤 Vendég"}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    {appointment.cancelledAt
                      ? appointment.cancelledAt.toLocaleString("hu-HU", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(appointment.id)}
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700"
                      title="Végleges törlés"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
