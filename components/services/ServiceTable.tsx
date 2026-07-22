"use client";

import { Service } from "@prisma/client";

import { Button } from "@/components/ui/Button";

type ServiceTableProps = {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: string) => Promise<void>;
};

export function ServiceTable({
  services,
  onEdit,
  onDelete,
}: ServiceTableProps) {
  if (services.length === 0) {
    return (
      <p className="mt-6 text-center text-gray-500">
        Még nincs szolgáltatás.
      </p>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Név
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold">
              Időtartam
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold">
              Ár
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold">
              Aktív
            </th>

            <th className="px-4 py-3 text-right text-sm font-semibold">
              Műveletek
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {services.map((service) => (
            <tr key={service.id}>
              <td className="px-4 py-3">
                <div className="font-medium">
                  {service.name}
                </div>

                {service.description && (
                  <div className="text-sm text-gray-500">
                    {service.description}
                  </div>
                )}
              </td>

              <td className="px-4 py-3">
                {service.duration} perc
              </td>

              <td className="px-4 py-3">
                {service.price.toLocaleString("hu-HU")} Ft
              </td>

              <td className="px-4 py-3">
                {service.active ? "✅" : "❌"}
              </td>

              <td className="px-4 py-3 text-right space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => onEdit(service)}
                >
                  Szerkesztés
                </Button>

                <Button
                  variant="danger"
                  onClick={() => onDelete(service.id)}
                >
                  Törlés
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}