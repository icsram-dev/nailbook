import { Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function getCustomers() {
  const customers = await prisma.user.findMany({
    where: {
      role: Role.CUSTOMER,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,

      _count: {
        select: {
          appointments: true,
        },
      },

      appointments: {
        select: {
          price: true,
          startTime: true,
          status: true,
        },
      },
    },

    orderBy: [
      {
        lastName: "asc",
      },
      {
        firstName: "asc",
      },
    ],
  });

  return customers.map((customer) => {
    const completedAppointments =
      customer.appointments.filter(
        (appointment) =>
          appointment.status === "COMPLETED"
      );

    const lastCompletedAppointment =
      [...completedAppointments].sort(
        (a, b) =>
          b.startTime.getTime() -
          a.startTime.getTime()
      )[0];

    const nextAppointment = customer.appointments
      .filter(
        (appointment) =>
          appointment.status === "CONFIRMED" &&
          appointment.startTime > new Date()
      )
      .sort(
        (a, b) =>
          a.startTime.getTime() -
          b.startTime.getTime()
      )[0];

    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      name: `${customer.lastName} ${customer.firstName}`,
      email: customer.email,
      phone: customer.phone,
      role: customer.role,

      appointmentCount:
        customer._count.appointments,

      totalSpent:
        completedAppointments.reduce(
          (sum, appointment) =>
            sum + appointment.price,
          0
        ),

      lastAppointment:
        lastCompletedAppointment?.startTime ??
        null,

      nextAppointment:
        nextAppointment?.startTime ?? null,
    };
  });
}

export async function getCustomerById(id: string) {
  const customer = await prisma.user.findFirst({
    where: {
      id,
      role: Role.CUSTOMER,
    },

    include: {
      appointments: {
        include: {
          service: {
            select: {
              name: true,
              duration: true,
            },
          },
        },

        orderBy: {
          startTime: "desc",
        },
      },
    },
  });

  if (!customer) {
    return null;
  }

  const completedAppointments =
    customer.appointments.filter(
      (appointment) =>
        appointment.status === "COMPLETED"
    );

  const cancelledAppointments =
    customer.appointments.filter(
      (appointment) =>
        appointment.status === "CANCELLED"
    ).length;

  const totalSpent =
    completedAppointments.reduce(
      (sum, appointment) =>
        sum + appointment.price,
      0
    );

  const lastCompletedAppointment =
    [...completedAppointments].sort(
      (a, b) =>
        b.startTime.getTime() -
        a.startTime.getTime()
    )[0];

  const nextAppointment = customer.appointments
    .filter(
      (appointment) =>
        appointment.status === "CONFIRMED" &&
        appointment.startTime > new Date()
    )
    .sort(
      (a, b) =>
        a.startTime.getTime() -
        b.startTime.getTime()
    )[0];

  return {
    id: customer.id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    name: `${customer.lastName} ${customer.firstName}`,
    email: customer.email,
    phone: customer.phone,

    appointmentCount:
      customer.appointments.length,

    totalSpent,

    cancelledAppointments,

    lastAppointment:
      lastCompletedAppointment?.startTime ??
      null,

    nextAppointment:
      nextAppointment?.startTime ?? null,

    appointments: customer.appointments,
  };
}
