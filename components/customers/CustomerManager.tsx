"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

import type { CustomerData } from "@/lib/validations/customer";

import { Button } from "@/components/ui/Button";
import { CustomerModal } from "./CustomerModal";
import { CustomerTable } from "./CustomerTable";

type CustomerManagerProps = {
  customers: User[];
};

export function CustomerManager({
  customers,
}: CustomerManagerProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState<User | null>(null);

  const isEditing = selectedCustomer !== null;

  async function saveCustomer(data: CustomerData) {
    try {
      const response = await fetch(
        isEditing
          ? `/api/customers/${selectedCustomer.id}`
          : "/api/customers",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(
          result.message ??
            `Nem sikerült ${
              isEditing
                ? "frissíteni"
                : "létrehozni"
            } a vendéget.`
        );
        return;
      }

      closeModal();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Váratlan hiba történt.");
    }
  }

  async function deleteCustomer(id: string) {
    if (
      !window.confirm(
        "Biztosan törölni szeretnéd ezt a vendéget?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `/api/customers/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        alert("Nem sikerült törölni a vendéget.");
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Váratlan hiba történt.");
    }
  }

  function createCustomer() {
    setSelectedCustomer(null);
    setOpen(true);
  }

  function editCustomer(customer: User) {
    setSelectedCustomer(customer);
    setOpen(true);
  }

  function closeModal() {
    setSelectedCustomer(null);
    setOpen(false);
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Vendégek
        </h1>

        <Button onClick={createCustomer}>
          + Új vendég
        </Button>
      </div>

      <CustomerTable
        customers={customers}
        onEdit={editCustomer}
        onDelete={deleteCustomer}
      />

      <CustomerModal
        open={open}
        onClose={closeModal}
        customer={selectedCustomer}
        onSubmit={saveCustomer}
      />
    </>
  );
}