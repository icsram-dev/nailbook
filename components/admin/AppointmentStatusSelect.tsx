"use client";

import { AppointmentStatus } from "@prisma/client";
import { useTransition } from "react";
import { updateAppointmentStatus } from "@/app/admin/appointments/actions";

type Props = {
  id: string;
  status: AppointmentStatus;
};

export default function AppointmentStatusSelect({ id, status }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      disabled={isPending}
      defaultValue={status}
      onChange={(e) =>
        startTransition(async () => {
          await updateAppointmentStatus(id, e.target.value as AppointmentStatus);
        })
      }
      className="rounded-xl border px-3 py-2"
    >
      <option value="PENDING">Függő</option>
      <option value="CONFIRMED">Megerősítve</option>
      <option value="IN_PROGRESS">Folyamatban</option>
      <option value="COMPLETED">Befejezve</option>
      <option value="CANCELLED">Lemondva</option>
      <option value="NO_SHOW">Nem jelent meg</option>
    </select>
  );
}
