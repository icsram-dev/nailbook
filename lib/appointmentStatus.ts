import { AppointmentStatus } from "@prisma/client";

export const APPOINTMENT_STATUS = {
  PENDING: {
    label: "Függőben",
    color: "#f59e0b",
    classes: "bg-yellow-100 text-yellow-800",
  },
  CONFIRMED: {
    label: "Jóváhagyva",
    color: "#22c55e",
    classes: "bg-green-100 text-green-800",
  },
  COMPLETED: {
    label: "Befejezve",
    color: "#3b82f6",
    classes: "bg-blue-100 text-blue-800",
  },
  CANCELLED: {
    label: "Lemondva",
    color: "#ef4444",
    classes: "bg-red-100 text-red-800",
  },
  NO_SHOW: {
    label: "Nem jelent meg",
    color: "#6b7280",
    classes: "bg-slate-200 text-slate-700",
  },
} as const;

export function getAppointmentStatusLabel(status: AppointmentStatus) {
  return APPOINTMENT_STATUS[status].label;
}

export function getAppointmentStatusClasses(status: AppointmentStatus) {
  return APPOINTMENT_STATUS[status].classes;
}
