import { prisma } from "@/lib/prisma";

export async function getCustomers() {
  const customers = await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
    },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,

      _count: {
        select: {
          appointments: true,
        },
      },

      appointments: {
        select: {
          price: true,
          startTime: true,
        },
        orderBy: {
          startTime: "desc",
        },
      },
    },

    orderBy: {
      name: "asc",
    },
  });

  return customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,

    appointmentCount: customer._count.appointments,

    totalSpent: customer.appointments.reduce(
      (sum, appointment) => sum + appointment.price,
      0
    ),

    lastAppointment:
      customer.appointments[0]?.startTime ?? null,
  }));
}