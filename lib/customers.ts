import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function getCustomers() {
  const customers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
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
        },
        orderBy: {
          startTime: "desc",
        },
      },
    },
     where: {
  role: Role.CUSTOMER,
},

    orderBy: {
      name: "asc",
    },
  });

  console.log("Customers:", customers);

  return customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    role: customer.role,

    appointmentCount: customer._count.appointments,

    totalSpent: customer.appointments.reduce(
      (sum, appointment) => sum + appointment.price,
      0
    ),

    lastAppointment:
      customer.appointments[0]?.startTime ?? null,
  }));
}

export async function getCustomerById(id: string) {
  const customer = await prisma.user.findFirst({
    where: {
      id,
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

  const totalSpent = customer.appointments.reduce(
    (sum, appointment) => sum + appointment.price,
    0
  );

  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,

    appointmentCount: customer.appointments.length,

    totalSpent,

    lastAppointment:
      customer.appointments[0]?.startTime ?? null,

    appointments: customer.appointments,
  };
}