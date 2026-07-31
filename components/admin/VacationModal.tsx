"use client";

import { Vacation } from "@prisma/client";

import { Modal } from "@/components/ui/Modal";

import type {
  VacationData,
  VacationInput,
} from "@/lib/validations/vacation";

import { VacationForm } from "./VacationForm";

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
  const defaultValues: VacationInput | undefined = vacation
    ? {
        startDate: vacation.startDate,
        endDate: vacation.endDate,
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
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      />
    </Modal>
  );
}