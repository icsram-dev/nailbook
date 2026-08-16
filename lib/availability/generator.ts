import { endOfDay } from "date-fns";

import { generateTimeSlots } from "./slots";
import { getAppointments, getOpeningHours, getService, getVacations } from "./repository";
import { TimeSlot } from "./types";

interface GenerateAvailableSlotsParams {
  date: Date;
  serviceId: string;
}

export async function generateAvailableSlots({
  date,
  serviceId,
}: GenerateAvailableSlotsParams): Promise<TimeSlot[]> {
  const service = await getService(serviceId);

  if (!service) {
    throw new Error("A szolgáltatás nem található.");
  }

  const openingHours = await getOpeningHours(date);

  if (!openingHours || !openingHours.isOpen || !openingHours.opensAt || !openingHours.closesAt) {
    return [];
  }

  const [openHour, openMinute] = openingHours.opensAt.split(":").map(Number);

  const [closeHour, closeMinute] = openingHours.closesAt.split(":").map(Number);

  const openingDate = new Date(date);
  openingDate.setHours(openHour, openMinute, 0, 0);

  const closingDate = new Date(date);
  closingDate.setHours(closeHour, closeMinute, 0, 0);

  const slots = generateTimeSlots(openingDate, closingDate, service.duration);

  const appointments = await getAppointments(date);
  const vacations = await getVacations(date);

  return slots.filter((slot) => {
    const hasAppointmentOverlap = appointments.some((appointment) => {
      return appointment.startTime < slot.endTime && appointment.endTime > slot.startTime;
    });

    if (hasAppointmentOverlap) {
      return false;
    }

    const isDuringVacation = vacations.some((vacation) => {
      const vacationStart = new Date(vacation.startDate);
      const vacationEnd = endOfDay(new Date(vacation.endDate));

      return vacationStart < slot.endTime && vacationEnd > slot.startTime;
    });

    return !isDuringVacation;
  });
}
