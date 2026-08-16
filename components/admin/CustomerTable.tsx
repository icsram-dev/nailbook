"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import SearchInput from "@/components/ui/SearchInput";
import { CustomerTableItem } from "@/types/customer";

type Props = {
  customers: CustomerTableItem[];
};

export default function CustomerTable({ customers }: Props) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const query = search.toLowerCase().trim();

    // Alapból ne jelenjen meg egyetlen vendég sem.
    if (!query) {
      return [];
    }

    return customers.filter((customer) => {
      const fullName = `${customer.lastName} ${customer.firstName}`.toLowerCase();

      return (
        fullName.includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query)
      );
    });
  }, [customers, search]);

  const hasSearch = search.trim().length > 0;

  return (
    <>
      <div className="mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Keresés név, e-mail vagy telefonszám alapján..."
        />
      </div>

      {!hasSearch ? (
        <div className="rounded-2xl border bg-white px-6 py-12 text-center shadow-sm">
          <p className="text-gray-500">
            Keress rá egy vendégre név, e-mail vagy telefonszám alapján.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="border-b bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4">Név</th>

                <th className="px-6 py-4">Telefon</th>

                <th className="px-6 py-4">E-mail</th>

                <th className="px-6 py-4 text-center">Foglalások</th>

                <th className="px-6 py-4 text-right">Összes költés</th>

                <th className="px-6 py-4">Következő időpont</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    Nincs a keresésnek megfelelő vendég.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    onClick={() => router.push(`/admin/customers/${customer.id}`)}
                    className="cursor-pointer border-b transition hover:bg-gray-50 last:border-0"
                  >
                    <td className="px-6 py-4 font-medium">
                      {customer.lastName} {customer.firstName}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">{customer.phone}</td>

                    <td className="whitespace-nowrap px-6 py-4">{customer.email}</td>

                    <td className="px-6 py-4 text-center">{customer.appointmentCount}</td>

                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      {customer.totalSpent.toLocaleString("hu-HU")} Ft
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {customer.nextAppointment
                        ? customer.nextAppointment.toLocaleDateString("hu-HU")
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
