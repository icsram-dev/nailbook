import clsx from "clsx";
import { AppointmentStatus } from "@prisma/client";

type Props = {
  status: AppointmentStatus;
};

const statusMap = {
  PENDING: {
    label: "Függő",
    className: "bg-yellow-100 text-yellow-700",
  },

  CONFIRMED: {
    label: "Megerősítve",
    className: "bg-green-100 text-green-700",
  },

  IN_PROGRESS: {
    label: "Folyamatban",
    className: "bg-blue-100 text-blue-700",
  },

  COMPLETED: {
    label: "Befejezve",
    className: "bg-gray-100 text-gray-700",
  },

  CANCELLED: {
    label: "Lemondva",
    className: "bg-red-100 text-red-700",
  },

  NO_SHOW: {
    label: "Nem jelent meg",
    className: "bg-orange-100 text-orange-700",
  },
};

export default function AppointmentStatusBadge({
  status,
}: Props) {
  const item = statusMap[status];

  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        item.className
      )}
    >
      {item.label}
    </span>
  );
}