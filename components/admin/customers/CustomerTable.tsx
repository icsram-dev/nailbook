"use client";

import { useMemo, useState } from "react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  _count: {
    appointments: number;
  };
};

type Props = {
  customers: Customer[];
};

export default function CustomerTable({
  customers,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const value = search.toLowerCase();

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(value) ||
        customer.email.toLowerCase().includes(value)
    );
  }, [customers, search]);

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Keresés név vagy e-mail alapján..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-pink-500"
      />

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-6 py-4">Név</th>
              <th className="px-6 py-4">E-mail</th>
              <th className="px-6 py-4">Telefon</th>
              <th className="px-6 py-4">Foglalások</th>
              <th className="px-6 py-4">Regisztrált</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t transition hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {customer.name}
                </td>

                <td className="px-6 py-4">
                  {customer.email}
                </td>

                <td className="px-6 py-4">
                  {customer.phone}
                </td>

                <td className="px-6 py-4">
                  {customer._count.appointments}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    customer.createdAt
                  ).toLocaleDateString("hu-HU")}
                </td>
              </tr>
            ))}

            {filteredCustomers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  Nincs találat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}