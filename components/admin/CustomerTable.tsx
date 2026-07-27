import { CustomerTableItem } from "@/types/customer";

type Props = {
  customers: CustomerTableItem[];
};

export default function CustomerTable({
  customers,
}: Props) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm">
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
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-b last:border-0 transition hover:bg-gray-50"
            >
              <td className="px-6 py-4 font-medium">
                {customer.name}
              </td>

              <td className="px-6 py-4">
                {customer.phone}
              </td>

              <td className="px-6 py-4">
                {customer.email}
              </td>

              <td className="px-6 py-4">
                {customer.appointmentCount}
              </td>

              <td className="px-6 py-4">
                {customer.totalSpent.toLocaleString("hu-HU")} Ft
              </td>

              <td className="px-6 py-4">
                {customer.lastAppointment
                  ? customer.lastAppointment.toLocaleDateString("hu-HU")
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}