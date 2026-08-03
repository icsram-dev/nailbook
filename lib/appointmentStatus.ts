import { AppointmentStatus } from "@prisma/client";

export function getAppointmentStatusLabel(
  status: AppointmentStatus
) {
  switch (status) {
    case "PENDING":
      return "Függőben";

    case "CONFIRMED":
      return "Megerősítve";

    case "COMPLETED":
      return "Teljesítve";

    case "CANCELLED":
      return "Lemondva";

    case "NO_SHOW":
      return "Nem jelent meg";

    default:
      return status;
  }
}

export function getAppointmentStatusClasses(
  status: AppointmentStatus
) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";

    case "CONFIRMED":
      return "bg-green-100 text-green-800";

    case "COMPLETED":
      return "bg-gray-100 text-gray-700";

    case "CANCELLED":
      return "bg-red-100 text-red-800";

    case "NO_SHOW":
      return "bg-slate-200 text-slate-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}