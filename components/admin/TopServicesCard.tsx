import { Card } from "@/components/ui/Card";
import { Award } from "lucide-react";

type TopService = {
  id: string;
  name: string;
  bookings: number;
};

type TopServicesCardProps = {
  services: TopService[];
};

export default function TopServicesCard({
  services,
}: TopServicesCardProps) {
  return (
    <Card>
      <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold">
        <Award className="h-5 w-5 text-yellow-500" />
        Legnépszerűbb szolgáltatások
      </h2>

      {services.length === 0 ? (
        <p className="text-sm text-gray-500">
          Még nincs teljesített foglalás.
        </p>
      ) : (
        <div className="space-y-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-3 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-600">
                  {index + 1}
                </div>

                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-gray-500">
                    {service.bookings} foglalás
                  </p>
                </div>
              </div>

              <Award className="h-5 w-5 text-yellow-500" />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}