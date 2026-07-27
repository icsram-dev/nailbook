import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AppointmentStatusBadge from "@/components/admin/AppointmentStatusBadge";
import { format } from "date-fns";
import { hu } from "date-fns/locale";
import AppointmentStatusSelect from "@/components/admin/AppointmentStatusSelect";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AppointmentPage({
  params,
}: Props) {
  const { id } = await params;

  const appointment = await prisma.appointment.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
      service: true,
    },
  });

  if (!appointment) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        title="Foglalás részletei"
        description="Foglalás adatainak megtekintése."
      />

      <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <Info
            title="Vendég"
            value={appointment.customer.name}
          />

          <Info
            title="Telefon"
            value={appointment.customer.phone}
          />

          <Info
            title="Email"
            value={appointment.customer.email}
          />

          <Info
            title="Szolgáltatás"
            value={appointment.service.name}
          />

          <Info
            title="Ár"
            value={`${appointment.price.toLocaleString("hu-HU")} Ft`}
          />

          <Info
            title="Dátum"
            value={format(
              appointment.startTime,
              "yyyy.MM.dd.",
              {
                locale: hu,
              }
            )}
          />

          <Info
            title="Idő"
            value={format(
              appointment.startTime,
              "HH:mm"
            )}
          />

          <div>
  <p className="mb-2 text-sm text-gray-500">
    Státusz
  </p>

  <div className="flex items-center gap-3">
    <AppointmentStatusBadge
      status={appointment.status}
    />

    <AppointmentStatusSelect
      id={appointment.id}
      status={appointment.status}
    />
  </div>
</div>
        </div>
      </div>
    </>
  );
}

type InfoProps = {
  title: string;
  value: string;
};

function Info({
  title,
  value,
}: InfoProps) {
  return (
    <div>
      <p className="mb-1 text-sm text-gray-500">
        {title}
      </p>

      <p className="text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}