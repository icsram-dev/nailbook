import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const appointments = await prisma.appointment.findMany({
    include: {
      customer: true,
      service: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  const events = appointments.map((appointment) => ({
    id: appointment.id,
    title: `${appointment.customer.name} - ${appointment.service.name}`,
    start: appointment.startTime,
    end: appointment.endTime,
    extendedProps: {
      customer: appointment.customer.name,
      service: appointment.service.name,
      status: appointment.status,
      price: appointment.price,
    },
  }));

  return NextResponse.json(events);
}