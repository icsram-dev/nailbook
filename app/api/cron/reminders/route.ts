import {
  addDays,
  endOfDay,
  startOfDay,
} from "date-fns";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { sendReminderEmail } from "@/lib/mail";

import {
  remindersEnabled,
  reminderDaysBefore,
  emailsEnabled,
} from "@/lib/settings/helpers";

export async function GET() {
  try {
    if (!(await remindersEnabled())) {
      return NextResponse.json({
        success: true,
        sent: 0,
        message: "Az emlékeztetők ki vannak kapcsolva.",
      });
    }

    if (!(await emailsEnabled())) {
      return NextResponse.json({
        success: true,
        sent: 0,
        message: "Az e-mail értesítések ki vannak kapcsolva.",
      });
    }

    const daysBefore = await reminderDaysBefore();

    const targetDate = addDays(
      new Date(),
      daysBefore
    );

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

    let sent = 0;

    for (const appointment of appointments) {
      try {
        const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/booking/cancel?token=${appointment.cancelToken}`;

        await sendReminderEmail({
          to: appointment.customer.email,
          customerName: `${appointment.customer.lastName} ${appointment.customer.firstName}`,
          serviceName: appointment.service.name,
          appointmentDate:
            appointment.startTime.toLocaleDateString(
              "hu-HU"
            ),
          appointmentTime:
            appointment.startTime.toLocaleTimeString(
              "hu-HU",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
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

        sent++;
      } catch (error) {
        console.error(
          `Nem sikerült emlékeztetőt küldeni a(z) ${appointment.id} foglaláshoz:`,
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
      sent,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Hiba történt az emlékeztetők küldése közben.",
      },
      {
        status: 500,
      }
    );
  }
}