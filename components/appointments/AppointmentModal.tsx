"use client";

import { Appointment, Service, User } from "@prisma/client";

import { Modal } from "@/components/ui/Modal";

import type { AppointmentData } from "@/lib/validations/appointment";

import { AppointmentForm } from "./AppointmentForm";

type AppointmentModalProps = {
  open: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  customers: User[];
  services: Service[];
  onSubmit: (data: AppointmentData) => void;
};

export function AppointmentModal({
  open,
  onClose,
  appointment,
  customers,
  services,
  onSubmit,
}: AppointmentModalProps) {
  return (
    <Modal
      open={open}
      title={
        appointment
          ? "Foglalás szerkesztése"
          : "Új foglalás"
      }
      onClose={onClose}
    >
      <AppointmentForm
        appointment={appointment}
        customers={customers}
        services={services}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}