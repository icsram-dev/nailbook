import AdminPageHeader from "@/components/admin/AdminPageHeader";
import CancelledAppointmentsStats from "@/components/admin/CancelledAppointmentsStats";
import CancelledAppointmentsTable from "@/components/admin/CancelledAppointmentsTable";

import { getCancelledAppointments } from "@/lib/cancelledAppointments";

export default async function CancelledAppointmentsPage() {
  const appointments = await getCancelledAppointments();

  return (
    <>
      <AdminPageHeader title="Lemondások" description="Az összes lemondott foglalás áttekintése." />

      <CancelledAppointmentsStats
        total={appointments.length}
        customerCancelled={
          appointments.filter((appointment) => appointment.cancelledBy === "Vendég").length
        }
        adminCancelled={
          appointments.filter((appointment) => appointment.cancelledBy === "Admin").length
        }
      />

      <CancelledAppointmentsTable appointments={appointments} />
    </>
  );
}
