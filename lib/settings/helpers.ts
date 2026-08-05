import { getSettings } from "@/lib/settings";

export async function emailsEnabled() {
  const settings = await getSettings();

  return settings?.emailNotifications ?? true;
}

export async function remindersEnabled() {
  const settings = await getSettings();

  return settings?.reminderEnabled ?? true;
}

export async function reminderDaysBefore() {
  const settings = await getSettings();

  return settings?.reminderDaysBefore ?? 2;
}

export async function cancellationHours() {
  const settings = await getSettings();

  return settings?.cancellationHours ?? 24;
}

export async function autoConfirmBookings() {
  const settings = await getSettings();

  return settings?.autoConfirmBookings ?? false;
}