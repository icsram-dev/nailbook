import { prisma } from "@/lib/prisma";
import AppointmentForm from "@/components/admin/AppointmentForm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default async function NewAppointmentPage() {
  const customers = await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
    },
    orderBy: {
      name: "asc",
    },
  });

  const services = await prisma.service.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <AdminPageHeader
        title="Új foglalás"
        description="Új időpont létrehozása."
      />

      <AppointmentForm
  customers={customers}
  services={services}
/>
    </>
  );
}