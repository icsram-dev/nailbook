type Customer = {
  appointmentCount: number;
  totalSpent: number;
  cancelledAppointments: number;
};

type Props = {
  customer: Customer;
};

export default function CustomerStats({
  customer,
}: Props) {
  const stats = [
    {
      label: "Foglalások",
      value: customer.appointmentCount,
    },
    {
      label: "Összes költés",
      value: `${customer.totalSpent.toLocaleString("hu-HU")} Ft`,
    },
    {
      label: "Lemondások",
      value: customer.cancelledAppointments,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <p className="text-sm text-gray-500">
            {stat.label}
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}