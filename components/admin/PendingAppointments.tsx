import Link from "next/link";

type Appointment = {
  id: string;
  startTime: Date;

  customer: {
    name: string;
  };

  service: {
    name: string;
  };
};

type Props = {
  appointments: Appointment[];
};

export default function PendingAppointments({
  appointments,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          🟡 Jóváhagyásra váró foglalások
        </h2>

        <Link
          href="/admin/calendar"
          className="text-sm font-medium text-pink-600 transition hover:underline"
        >
          Naptár →
        </Link>
      </div>

      {appointments.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
          Nincs jóváhagyásra váró foglalás.
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-gray-50"
            >
              <div>
                <h3 className="font-semibold">
                  {appointment.customer.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {appointment.service.name}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {appointment.startTime.toLocaleString(
                    "hu-HU",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>

              <Link
                href="/admin/calendar"
                className="rounded-xl bg-pink-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-pink-700"
              >
                Megnyitás
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}