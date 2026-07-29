"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import CustomerSearch from "@/components/admin/CustomerSearch";
import { CustomerTableItem } from "@/types/customer";

type Props = {
  customers: CustomerTableItem[];
};

export default function CustomerTable({
  customers,
}: Props) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return customers;
    }

    return customers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query)
      );
    });
  }, [customers, search]);

  return (
    <>
      <CustomerSearch
        value={search}
        onChange={setSearch}
      />

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-sm text-gray-500">
              <th className="px-6 py-4">Név</th>
              <th className="px-6 py-4">Telefon</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Foglalások</th>
              <th className="px-6 py-4">Összes költés</th>
              <th className="px-6 py-4">Utolsó látogatás</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  Nincs a keresésnek megfelelő vendég.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() =>
                    router.push(
                      `/admin/customers/${customer.id}`
                    )
                  }
                  className="cursor-pointer border-b transition hover:bg-gray-50 last:border-0"
                >
                  <td className="px-6 py-4 font-medium">
                    {customer.name}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    {customer.phone}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    {customer.email}
                  </td>

                  <td className="px-6 py-4">
                    {customer.appointmentCount}
                  </td>

                  <td className="px-6 py-4">
                    {customer.totalSpent.toLocaleString(
                      "hu-HU"
                    )}{" "}
                    Ft
                  </td>

                  <td className="px-6 py-4">
                    {customer.lastAppointment
                      ? customer.lastAppointment.toLocaleDateString(
                          "hu-HU"
                        )
                      : "-"}
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