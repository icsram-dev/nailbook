import { addDays, endOfDay, startOfDay } from "date-fns";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { sendReminderEmail } from "@/lib/mail";

export async function GET() {
  try {
    const targetDate = addDays(new Date(), 2);

    const appointments = await prisma.appointment.findMany({
      where: {
        reminderSent: false,
        status: "CONFIRMED",
        startTime: {
          gte: startOfDay(targetDate),
          lte: endOfDay(targetDate),
        },
      },
      include: {
        customer: true,
        service: true,
      },
    });

    for (const appointment of appointments) {
      try {
        const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/booking/cancel?token=${appointment.cancelToken}`;

        await sendReminderEmail({
          to: appointment.customer.email,
          customerName: appointment.customer.name,
          serviceName: appointment.service.name,
          appointmentDate:
            appointment.startTime.toLocaleDateString("hu-HU"),
          appointmentTime:
            appointment.startTime.toLocaleTimeString("hu-HU", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          cancelUrl,
        });

        await prisma.appointment.update({
          where: {
            id: appointment.id,
          },
          data: {
            reminderSent: true,
          },
        });
      } catch (error) {
        console.error(
          `Nem sikerült emlékeztetőt küldeni a(z) ${appointment.id} foglaláshoz:`,
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
      sent: appointments.length,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Hiba történt az emlékeztetők küldése közben.",
      },
      {
        status: 500,
      }
    );
  }
}