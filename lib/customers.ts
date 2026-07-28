export async function getCustomerById(id: string) {
  const customer = await prisma.user.findUnique({
    where: {
      id,
      role: "CUSTOMER",
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