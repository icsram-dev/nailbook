import type { AppointmentStatus } from "@prisma/client";

import AppointmentHistory from "./AppointmentHistory";
import CustomerStats from "./CustomerStats";

type Appointment = {
  id: string;
  startTime: Date;
  price: number;
  status: AppointmentStatus;
  service: {
    name: string;
    duration: number;
  };
};

type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  appointmentCount: number;
  totalSpent: number;
  cancelledAppointments: number;
  appointments: Appointment[];
};

type Props = {
  customer: Customer;
};

export default function CustomerProfile({
  customer,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">
          {customer.lastName} {customer.firstName}
        </h2>

        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-900">
              Telefon:
            </span>{" "}
            {customer.phone ?? "-"}
          </p>

          <p>
            <span className="font-medium text-gray-900">
              E-mail:
            </span>{" "}
            {customer.email ?? "-"}
          </p>
        </div>
      </div>

      <CustomerStats customer={customer} />

      <AppointmentHistory
        customerId={customer.id}
        appointments={customer.appointments}
      />
    </div>
  );
}