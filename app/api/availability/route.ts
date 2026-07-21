import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  WORKDAY,
  generateTimeSlots,
  isTimeSlotAvailable,
  type BookingAppointment,
} from "@/lib/booking";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const date = searchParams.get("date");
  const serviceId = searchParams.get("serviceId");

  if (!date) {
    return NextResponse.json(
      {
        success: false,
        message: "Hiányzó dátum.",
      },
      { status: 400 }
    );
  }

  if (!serviceId) {
    return NextResponse.json(
      {
        success: false,
        message: "Hiányzó szolgáltatás.",
      },
      { status: 400 }
    );
  }

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    return NextResponse.json(
      {
        success: false,
        message: "A szolgáltatás nem található.",
      },
      { status: 404 }
    );
  }

  const startOfDay = new Date(`${date}T00:00:00`);
  const endOfDay = new Date(`${date}T23:59:59`);

  const appointments = await prisma.appointment.findMany({
    where: {
      startTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: {
        in: ["PENDING", "CONFIRMED"],
      },
    },
    orderBy: {
      startTime: "asc",
    },
    select: {
      startTime: true,
      endTime: true,
    },
  });

  const bookingAppointments: BookingAppointment[] = appointments.map(
    (appointment) => ({
      start:
        appointment.startTime.getHours() * 60 +
        appointment.startTime.getMinutes(),
      end:
        appointment.endTime.getHours() * 60 +
        appointment.endTime.getMinutes(),
    })
  );

  // ===== DEBUG =====

  console.log("======================================");
  console.log("DATE:", date);
  console.log("SERVICE:", service.name);
  console.log("SERVICE DURATION:", service.duration);

  console.log("BOOKING APPOINTMENTS:");
  console.table(bookingAppointments);

  const allSlots = generateTimeSlots(
    WORKDAY.startHour,
    WORKDAY.endHour,
    WORKDAY.interval
  );

  console.log("ALL SLOTS:");
  console.log(allSlots);

  const availableSlots = allSlots.filter((slot) =>
    isTimeSlotAvailable(
      slot,
      service.duration,
      bookingAppointments
    )
  );

  console.log("AVAILABLE SLOTS:");
  console.log(availableSlots);
  console.log("======================================");

  return NextResponse.json({
    success: true,
    slots: availableSlots,
  });
}