"use client";

import { User } from "@prisma/client";
import { Modal } from "@/components/ui/Modal";

import type {
  CustomerData,
  CustomerInput,
} from "@/lib/validations/customer";

import { CustomerForm } from "./CustomerForm";

type CustomerModalProps = {
  open: boolean;
  onClose: () => void;
  customer: User | null;
  onSubmit: (data: CustomerData) => Promise<void>;
};

export function CustomerModal({
  open,
  onClose,
  customer,
  onSubmit,
}: CustomerModalProps) {
  const defaultValues: CustomerInput | undefined = customer
    ? {
        name: customer.name,
        email: customer.email,
        phone: customer.phone ?? "",
      }
    : undefined;

  return (
    <Modal
      open={open}
      title={
        customer
          ? "Vendég szerkesztése"
          : "Új vendég"
      }
      onClose={onClose}
    >
      <CustomerForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}