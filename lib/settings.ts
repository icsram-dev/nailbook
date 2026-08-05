import { prisma } from "@/lib/prisma";

const SETTINGS_ID = "default-settings";

export async function getSettings() {
  return prisma.settings.findUnique({
    where: {
      id: SETTINGS_ID,
    },
  });
}

export async function updateBookingSettings(
  autoConfirmBookings: boolean,
  cancellationHours: number
) {
  return prisma.settings.update({
    where: {
      id: SETTINGS_ID,
    },
    data: {
      autoConfirmBookings,
      cancellationHours,
    },
  });
}

export async function updateEmailSettings(
  emailNotifications: boolean
) {
  return prisma.settings.update({
    where: {
      id: SETTINGS_ID,
    },
    data: {
      emailNotifications,
    },
  });
}

export async function updateReminderSettings(
  reminderEnabled: boolean,
  reminderDaysBefore: number
) {
  return prisma.settings.update({
    where: {
      id: SETTINGS_ID,
    },
    data: {
      reminderEnabled,
      reminderDaysBefore,
    },
  });
}