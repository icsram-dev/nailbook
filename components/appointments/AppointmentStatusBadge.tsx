import { AppointmentStatus } from "@prisma/client";

type AppointmentStatusBadgeProps = {
  status: AppointmentStatus;
};

const statusConfig: Record<
  AppointmentStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING: {
    label: "Függőben",
    className: "bg-yellow-100 text-yellow-800",
  },
  CONFIRMED: {
    label: "Megerősítve",
    className: "bg-green-100 text-green-800",
  },

  COMPLETED: {
    label: "Teljesítve",
    className: "bg-emerald-100 text-emerald-800",
  },
  CANCELLED: {
    label: "Lemondva",
    className: "bg-red-100 text-red-800",
  },
  NO_SHOW: {
    label: "Nem jelent meg",
    className: "bg-gray-200 text-gray-800",
  },
};

export default function AppointmentStatusBadge({ status }: AppointmentStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
