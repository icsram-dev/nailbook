import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendBookingCancelledByCustomer } from "@/lib/mail";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: Props) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Bejelentkezés szükséges." }, { status: 401 });
    }

    const { id } = await params;

    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    });

    if (!appointment) {
      return NextResponse.json({ error: "A foglalás nem található." }, { status: 404 });
    }

    if (appointment.customerId !== session.user.id) {
      return NextResponse.json({ error: "Nincs jogosultság." }, { status: 403 });
    }

    if (!["PENDING", "CONFIRMED"].includes(appointment.status)) {
      return NextResponse.json(
        {
          error: "Ez a foglalás már nem mondható le.",
        },
        { status: 400 }
      );
    }

    const now = new Date();

    const diff = appointment.startTime.getTime() - now.getTime();

    const hours = diff / (1000 * 60 * 60);

    if (hours < 24) {
      return NextResponse.json(
        {
          error: "A foglalás már csak 24 óránál korábban mondható le.",
        },
        { status: 400 }
      );
    }

    const updated = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        status: "CANCELLED",
        cancelledBy: "CUSTOMER",
        cancelledAt: new Date(),
      },
      include: {
        customer: true,
        service: true,
      },
    });

    try {
      await sendBookingCancelledByCustomer({
        to: updated.customer.email,
        customerName: `${updated.customer.lastName} ${updated.customer.firstName}`,
        serviceName: updated.service.name,
        appointmentDate: updated.startTime.toLocaleDateString("hu-HU"),
        appointmentTime: updated.startTime.toLocaleTimeString("hu-HU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } catch (error) {
      console.error("Nem sikerült elküldeni a lemondási visszaigazolást:", error);
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Szerverhiba." }, { status: 500 });
  }
}
