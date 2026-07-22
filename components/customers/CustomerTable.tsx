import { User } from "@prisma/client";

import { Button } from "@/components/ui/Button";

type CustomerTableProps = {
  customers: User[];
  onEdit: (customer: User) => void;
  onDelete: (id: string) => void;
};

export function CustomerTable({
  customers,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Név</th>
            <th className="px-4 py-3 text-left">E-mail</th>
            <th className="px-4 py-3 text-left">Telefon</th>
            <th className="px-4 py-3 text-left">Műveletek</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-t"
            >
              <td className="px-4 py-3">
                {customer.name}
              </td>

              <td className="px-4 py-3">
                {customer.email}
              </td>

              <td className="px-4 py-3">
                {customer.phone ?? "-"}
              </td>

              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => onEdit(customer)}
                  >
                    Szerkesztés
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() =>
                      onDelete(customer.id)
                    }
                  >
                    Törlés
                  </Button>
                </div>
              </td>
            </tr>
          ))}

          {customers.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="py-6 text-center text-gray-500"
              >
                Még nincs vendég.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}