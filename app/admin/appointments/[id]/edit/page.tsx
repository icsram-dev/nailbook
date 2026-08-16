import { notFound } from "next/navigation";
import { Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getAppointmentById } from "@/lib/appointments/service";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import EditAppointmentForm from "@/components/admin/EditAppointmentForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAppointmentPage({ params }: Props) {
  const { id } = await params;

  const appointment = await getAppointmentById(id);

  if (!appointment) {
    notFound();
  }

  const [customers, services] = await Promise.all([
    prisma.user.findMany({
      where: {
        role: Role.CUSTOMER,
      },
      orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    }),

    prisma.service.findMany({
      where: {
        active: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    }),
  ]);

  return (
    <PageContainer>
      <PageHeader title="Foglalás szerkesztése" description="Módosítsd a foglalás adatait." />

      <EditAppointmentForm
        appointment={{
          id: appointment.id,
          customerId: appointment.customerId,
          serviceId: appointment.serviceId,
          startTime: appointment.startTime.toISOString(),
          customerNote: appointment.customerNote,
          status: appointment.status,
        }}
        customers={customers}
        services={services}
      />
    </PageContainer>
  );
}
