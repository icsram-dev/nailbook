import { prisma } from "@/lib/prisma";

export async function getAppointments() {
  return prisma.appointment.findMany({
    include: {
      customer: true,
      service: true,
    },
    orderBy: {
      startTime: "desc",
    },
  });
}

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
  // Szolgáltatás lekérése
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("A szolgáltatás nem található.");
  }

  // Időpontok kiszámítása
  const startTime = new Date(`${date}T${time}:00`);

  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + service.duration);

  // Ütközés vizsgálata
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
    throw new Error("Ebben az időpontban már van foglalás.");
  }

  // Foglalás frissítése
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
      note: note?.trim() || null,
    },

    include: {
      customer: true,
      service: true,
    },
  });
}