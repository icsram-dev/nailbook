"use client";

import { Modal } from "@/components/ui/Modal";
import { AppointmentForm } from "./AppointmentForm";

type Props = {
  open: boolean;
  selectedDate: string | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function AppointmentModal({
  open,
  selectedDate,
  onClose,
  onSuccess,
}: Props) {
  return (
    <Modal
      open={open}
      title="Új foglalás"
      onClose={onClose}
    >
      <AppointmentForm
        selectedDate={selectedDate}
        onCancel={onClose}
        onSuccess={onSuccess}
      />
    </Modal>
  );
}