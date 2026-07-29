type Appointment = {
  id: string;
  startTime: Date;
  price: number;
  status: string;
  service: {
    name: string;
    duration: number;
  };
};

type Props = {
  appointments: Appointment[];
};

export default function AppointmentHistory({
  appointments,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Foglalási előzmények
        </h2>
      </div>

      {appointments.length === 0 ? (
        <p className="px-6 py-8 text-center text-gray-500">
          Még nincs foglalás.
        </p>
      ) : (
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-sm text-gray-500">
              <th className="px-6 py-4">Dátum</th>
              <th className="px-6 py-4">Szolgáltatás</th>
              <th className="px-6 py-4">Időtartam</th>
              <th className="px-6 py-4">Ár</th>
              <th className="px-6 py-4">Státusz</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  {appointment.startTime.toLocaleString("hu-HU")}
                </td>

                <td className="px-6 py-4 font-medium">
                  {appointment.service.name}
                </td>

                <td className="px-6 py-4">
                  {appointment.service.duration} perc
                </td>

                <td className="px-6 py-4">
                  {appointment.price.toLocaleString("hu-HU")} Ft
                </td>

                <td className="px-6 py-4">
                  {appointment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}