"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

const STATUS_LABELS = {
  PENDING: "Függőben",
  CONFIRMED: "Megerősítve",
  COMPLETED: "Teljesítve",
  CANCELLED: "Lemondva",
  NO_SHOW: "Nem jelent meg",
};

type Appointment = {
  id: string;
  customerName: string;
  customerPhone?: string | null;
  customerEmail?: string | null;

  serviceName: string;
  duration: number;
  price: number;

  startTime: string;
  endTime: string;

  status: string;

  customerNote?: string | null;
  note?: string | null;
};

type Props = {
  open: boolean;
  appointment: Appointment | null;

  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function AppointmentDetailsModal({
  open,
  appointment,
  onClose,
  onEdit,
  onDelete,
}: Props) {
  if (!appointment) return null;

  return (
    <Modal
      open={open}
      title="Foglalás részletei"
      onClose={onClose}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">
            {appointment.customerName}
          </h3>

          <p className="text-gray-500">
            {appointment.customerPhone || "Nincs telefonszám"}
          </p>

          <p className="text-gray-500">
            {appointment.customerEmail || "Nincs e-mail"}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p>
            <strong>Szolgáltatás:</strong>{" "}
            {appointment.serviceName}
          </p>

          <p>
            <strong>Időtartam:</strong>{" "}
            {appointment.duration} perc
          </p>

          <p>
            <strong>Ár:</strong>{" "}
            {appointment.price.toLocaleString("hu-HU")} Ft
          </p>
        </div>

        <div className="rounded-xl border p-4">
      <p>
  <strong>Kezdés:</strong>{" "}
  {new Date(appointment.startTime).toLocaleString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })}
</p>

<p>
  <strong>Befejezés:</strong>{" "}
  {new Date(appointment.endTime).toLocaleString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })}
</p>

          <p>
  <strong>Státusz:</strong>{" "}
  {STATUS_LABELS[
    appointment.status as keyof typeof STATUS_LABELS
  ]}
</p>
        </div>

        {appointment.customerNote && (
          <div>
            <h4 className="font-semibold">
              Vendég megjegyzése
            </h4>

            <p>{appointment.customerNote}</p>
          </div>
        )}

        {appointment.note && (
          <div>
            <h4 className="font-semibold">
              Belső megjegyzés
            </h4>

            <p>{appointment.note}</p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-700"
            onClick={onDelete}
          >
            Törlés
          </Button>

          <Button
            type="button"
            onClick={onEdit}
          >
            Szerkesztés
          </Button>
        </div>
      </div>
    </Modal>
  );
}