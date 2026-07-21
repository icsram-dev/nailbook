import { prisma } from "@/lib/prisma";

type UpdateAppointmentInput = {
  appointmentId: string;
  customerId: string;
  serviceId: string;
  date: string;
  time: string;
  note?: string;
};

export async function updateAppointment({
  appointmentId,
  customerId,
  serviceId,
  date,
  time,
  note,
}: UpdateAppointmentInput) {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("A szolgáltatás nem található.");
  }

  const startTime = new Date(`${date}T${time}:00`);

  const endTime = new Date(startTime);

  endTime.setMinutes(
    endTime.getMinutes() + service.duration
  );

  const conflict = await prisma.appointment.findFirst({
  where: {
    id: {
      not: appointmentId,
    },

    startTime: {
      lt: endTime,
    },

    endTime: {
      gt: startTime,
    },
  },
});

if (conflict) {
  throw new Error(
    "Ebben az időpontban már van foglalás."
  );
}

  return prisma.appointment.update({
    where: {
      id: appointmentId,
    },

    data: {
      customerId,
      serviceId,

      startTime,
      endTime,

      price: service.price,

      note,
    },
  });
}