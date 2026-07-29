import { prisma } from "@/lib/prisma";
import { checkAppointmentOverlap } from "./overlap";
import { checkOpeningHours } from "./opening-hours";
import { checkVacation } from "./vacation";
import type {
  AppointmentValidationInput,
  ValidationResult,
} from "./types";

export async function validateAppointment({
  serviceId,
  startTime,
  appointmentId,
}: AppointmentValidationInput): Promise<ValidationResult> {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
    select: {
      id: true,
      duration: true,
    },
  });

  if (!service) {
    return {
      ok: false,
      message: "A szolgáltatás nem található.",
    };
  }

  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + service.duration);

  const isWithinOpeningHours = await checkOpeningHours({
    startTime,
    endTime,
  });

  if (!isWithinOpeningHours) {
    return {
      ok: false,
      message: "A kiválasztott időpont kívül esik a nyitvatartási időn.",
    };
  }

  const isDuringVacation = await checkVacation({
    startTime,
    endTime,
  });

  if (isDuringVacation) {
    return {
      ok: false,
      message: "Erre az időpontra szabadság van beállítva.",
    };
  }

  const hasOverlap = await checkAppointmentOverlap({
    appointmentId,
    startTime,
    endTime,
  });

  if (hasOverlap) {
    return {
      ok: false,
      message: "Ebben az időpontban már van foglalás.",
    };
  }

  return {
    ok: true,
    endTime,
  };
}