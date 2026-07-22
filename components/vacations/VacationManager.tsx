"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Vacation } from "@prisma/client";

import type { VacationData } from "@/lib/validations/vacation";

import { Button } from "@/components/ui/Button";
import { VacationTable } from "./VacationTable";
import { VacationModal } from "./VacationModal";

type VacationManagerProps = {
  vacations: Vacation[];
};

export function VacationManager({
  vacations,
}: VacationManagerProps) {
  const [open, setOpen] = useState(false);
  const [selectedVacation, setSelectedVacation] =
    useState<Vacation | null>(null);

  const router = useRouter();

  async function saveVacation(data: VacationData) {
    const isEditing = selectedVacation !== null;

    try {
      const response = await fetch(
        isEditing
          ? `/api/vacations/${selectedVacation.id}`
          : "/api/vacations",
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
              isEditing ? "frissíteni" : "létrehozni"
            } a szabadságot.`
        );
        return;
      }

      setOpen(false);
      setSelectedVacation(null);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Váratlan hiba történt.");
    }
  }

  async function deleteVacation(id: string) {
    const confirmed = window.confirm(
      "Biztosan törölni szeretnéd ezt a szabadságot?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/vacations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Nem sikerült törölni.");
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Váratlan hiba történt.");
    }
  }

  function editVacation(vacation: Vacation) {
    setSelectedVacation(vacation);
    setOpen(true);
  }

  function createVacation() {
    setSelectedVacation(null);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setSelectedVacation(null);
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Szabadságok
        </h1>

        <Button onClick={createVacation}>
          + Új szabadság
        </Button>
      </div>

      <VacationTable
        vacations={vacations}
        onDelete={deleteVacation}
        onEdit={editVacation}
      />

      <VacationModal
        open={open}
        onClose={closeModal}
        vacation={selectedVacation}
        onSubmit={saveVacation}
      />
    </>
  );
}
