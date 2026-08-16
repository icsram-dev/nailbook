import { NextRequest, NextResponse } from "next/server";
import { AppointmentStatus } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmed } from "@/lib/mail";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Nincs jogosultság.",
        },
        {
          status: 403,
        }
      );
    }

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
      return NextResponse.json(
        {
          error: "A foglalás nem található.",
        },
        {
          status: 404,
        }
      );
    }

    if (appointment.status !== AppointmentStatus.PENDING) {
      return NextResponse.json(
        {
          error: "A foglalás már jóvá lett hagyva.",
        },
        {
          status: 400,
        }
      );
    }

    const updatedAppointment = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        status: AppointmentStatus.CONFIRMED,
      },
      include: {
        customer: true,
        service: true,
      },
    });

    try {
      const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/booking/cancel?token=${updatedAppointment.cancelToken}`;

      await sendBookingConfirmed({
        to: updatedAppointment.customer.email,
        customerName: `${updatedAppointment.customer.lastName} ${updatedAppointment.customer.firstName}`,
        serviceName: updatedAppointment.service.name,
        appointmentDate: updatedAppointment.startTime.toLocaleDateString("hu-HU"),
        appointmentTime: updatedAppointment.startTime.toLocaleTimeString("hu-HU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        cancelUrl,
      });
    } catch (error) {
      console.error("Nem sikerült elküldeni a jóváhagyó e-mailt:", error);
    }

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Hiba történt.",
      },
      {
        status: 500,
      }
    );
  }
}
