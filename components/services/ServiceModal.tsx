"use client";

import { Service } from "@prisma/client";

import { Modal } from "@/components/ui/Modal";

import type {
  ServiceData,
  ServiceInput,
} from "@/lib/validations/service";

import { ServiceForm } from "./ServiceForm";

type ServiceModalProps = {
  open: boolean;
  onClose: () => void;
  service: Service | null;
  onSubmit: (data: ServiceData) => Promise<void>;
};

export function ServiceModal({
  open,
  onClose,
  service,
  onSubmit,
}: ServiceModalProps) {
  const defaultValues: ServiceInput | undefined = service
    ? {
        name: service.name,
        description: service.description ?? "",
        duration: service.duration,
        price: service.price,
        active: service.active,
      }
    : undefined;

  return (
    <Modal
      open={open}
      title={
        service
          ? "Szolgáltatás szerkesztése"
          : "Új szolgáltatás"
      }
      onClose={onClose}
    >
      <ServiceForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      />
    </Modal>
  );
}