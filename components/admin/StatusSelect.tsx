"use client";

import { AppointmentStatus } from "@prisma/client";
import { useTransition } from "react";

type Props = {
  appointmentId: string;
  status: AppointmentStatus;
};

const options = [
  { value: "PENDING", label: "Függőben" },
  { value: "CONFIRMED", label: "Megerősítve" },
  { value: "COMPLETED", label: "Teljesítve" },
  { value: "CANCELLED", label: "Lemondva" },
  { value: "NO_SHOW", label: "Nem jelent meg" },
] as const;

export default function StatusSelect({
  appointmentId,
  status,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function updateStatus(value: AppointmentStatus) {
    startTransition(async () => {
      await fetch(
        `/api/admin/appointments/${appointmentId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: value,
          }),
        }
      );
    });
  }

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) =>
        updateStatus(e.target.value as AppointmentStatus)
      }
      className="rounded-lg border px-3 py-2 text-sm"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}