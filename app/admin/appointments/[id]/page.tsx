import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AppointmentEditForm from "./AppointmentEditForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAppointmentPage({
  params,
}: Props) {
  const { id } = await params;

  const [appointment, services] = await Promise.all([
    prisma.appointment.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        service: true,
      },
    }),

    prisma.service.findMany({
      where: {
        active: true,
      },
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!appointment) {
    notFound();
  }

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">
        Foglalás szerkesztése
      </h1>

      <AppointmentEditForm
        appointment={appointment}
        services={services}
      />
    </>
  );
}