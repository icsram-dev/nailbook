import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const body = await request.json();

  const { serviceId, date, time } = body;

  if (!serviceId || !date || !time) {
    return NextResponse.json(
      {
        success: false,
        message: "Hiányzó adatok.",
      },
      { status: 400 }
    );
  }

const session = await auth();

if (!session?.user) {
  return NextResponse.json(
    {
      success: false,
      message: "A foglaláshoz be kell jelentkezned.",
    },
    { status: 401 }
  );
}

const customerId = session.user.id;

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

  const startTime = new Date(`${date}T${time}:00`);

  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + service.duration);

const existingAppointment = await prisma.appointment.findFirst({
  where: {
    status: {
      in: ["PENDING", "CONFIRMED"],
    },
    startTime: {
      lt: endTime,
    },
    endTime: {
      gt: startTime,
    },
  },
});

const workDayEnd = new Date(`${date}T17:00:00`);

if (endTime > workDayEnd) {
  return NextResponse.json(
    {
      success: false,
      message: "A szolgáltatás nem fér bele a munkaidőbe.",
    },
    {
      status: 400,
    }
  );
}

  if (existingAppointment) {
    return NextResponse.json(
      {
        success: false,
        message: "Ez az időpont már foglalt.",
      },
      { status: 409 }
    );
  }

  // Foglalás létrehozása
  const appointment = await prisma.appointment.create({
    data: {
  customerId,
  serviceId: service.id,
  startTime,
  endTime,
  price: service.price,
},
  });

  return NextResponse.json(
    {
      success: true,
      appointment,
    },
    { status: 201 }
  );
}