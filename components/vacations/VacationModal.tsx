"use client";

import { Vacation } from "@prisma/client";

import { Modal } from "@/components/ui/Modal";

import { VacationForm } from "./VacationForm";
import type { VacationData } from "@/lib/validations/vacation";

type VacationModalProps = {
  open: boolean;
  onClose: () => void;
  vacation: Vacation | null;
  onSubmit: (data: VacationData) => Promise<void>;
};

export function VacationModal({
  open,
  onClose,
  vacation,
  onSubmit,
}: VacationModalProps) {
  const defaultValues = vacation
    ? {
        startDate: vacation.startDate.toISOString().slice(0, 10),
        endDate: vacation.endDate.toISOString().slice(0, 10),
        reason: vacation.reason ?? "",
      }
    : undefined;

  return (
    <Modal
      open={open}
      title={
        vacation
          ? "Szabadság szerkesztése"
          : "Új szabadság"
      }
      onClose={onClose}
    >
      <VacationForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}