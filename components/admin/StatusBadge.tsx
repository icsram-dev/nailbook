import { AppointmentStatus } from "@prisma/client";

type Props = {
  status: AppointmentStatus;
};

const statusMap: Record<
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
  CANCELLED: {
    label: "Lemondva",
    className: "bg-red-100 text-red-800",
  },
  COMPLETED: {
    label: "Teljesítve",
    className: "bg-blue-100 text-blue-800",
  },
  NO_SHOW: {
    label: "Nem jelent meg",
    className: "bg-gray-200 text-gray-700",
  },
};

export default function StatusBadge({ status }: Props) {
  const config = statusMap[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}