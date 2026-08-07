import { Card } from "@/components/ui/Card";
import {
  Calendar,
  Clock,
  Scissors,
  User,
} from "lucide-react";
import { format } from "date-fns";
import { hu } from "date-fns/locale";

type NextAppointment = {
  customer: {
    firstName: string;
    lastName: string;
  };
  service: {
    name: string;
    duration: number;
  };
  startTime: Date;
} | null;

type NextAppointmentCardProps = {
  appointment: NextAppointment;
};

export default function NextAppointmentCard({
  appointment,
}: NextAppointmentCardProps) {
  if (!appointment) {
    return (
      <Card>
        <h2 className="mb-4 text-lg font-semibold">
          Következő vendég
        </h2>

        <p className="text-sm text-gray-500">
          Nincs közelgő foglalás.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="mb-6 text-lg font-semibold">
        Következő vendég
      </h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-pink-500" />

          <div>
            <p className="text-sm text-gray-500">
              Vendég
            </p>

            <p className="font-semibold">
              {appointment.customer.lastName}{" "}
              {appointment.customer.firstName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Scissors className="h-5 w-5 text-violet-500" />

          <div>
            <p className="text-sm text-gray-500">
              Szolgáltatás
            </p>

            <p className="font-semibold">
              {appointment.service.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-blue-500" />

          <div>
            <p className="text-sm text-gray-500">
              Időpont
            </p>

            <p className="font-semibold">
              {format(
                new Date(appointment.startTime),
                "yyyy. MMMM d. HH:mm",
                {
                  locale: hu,
                }
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-emerald-500" />

          <div>
            <p className="text-sm text-gray-500">
              Időtartam
            </p>

            <p className="font-semibold">
              {appointment.service.duration} perc
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}