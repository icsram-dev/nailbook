"use client";

import { Modal } from "@/components/ui/Modal";
import { AppointmentForm } from "./AppointmentForm";

type Props = {
  open: boolean;
  selectedDate: string | null;
  appointmentId: string | null;
  onClose: () => void;
  onSuccess: () => void;
  customerPreview?: { name: string; phone?: string | null; email?: string | null } | null;
};

export function AppointmentModal({
  open,
  selectedDate,
  appointmentId,
  onClose,
  onSuccess,
  customerPreview,
}: Props) {
  const isEditMode = !!appointmentId;

  return (
    <Modal
      open={open}
      title={isEditMode ? "Foglalás szerkesztése" : "Új foglalás"}
      onClose={onClose}
    >
      <AppointmentForm
        selectedDate={selectedDate}
        appointmentId={appointmentId}
        onCancel={onClose}
        onSuccess={onSuccess}
        customerPreview={customerPreview}
      />
    </Modal>
  );
}
