"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Vacation } from "@prisma/client";

import type { VacationData } from "@/lib/validations/vacation";

import { createVacationAction, deleteVacationAction } from "@/app/admin/vacations/actions";

import { Button } from "@/components/ui/Button";

import { VacationModal } from "./VacationModal";
import { VacationTable } from "./VacationTable";

type VacationManagerProps = {
  vacations: Vacation[];
};

export function VacationManager({ vacations }: VacationManagerProps) {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  async function saveVacation(data: VacationData) {
    startTransition(async () => {
      try {
        await createVacationAction(data);

        closeModal();
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Hiba történt a mentés során.");
      }
    });
  }

  async function deleteVacation(id: string) {
    const confirmed = window.confirm("Biztosan törölni szeretnéd ezt a szabadságot?");

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await deleteVacationAction(id);

        if (!result.success) {
          alert("Nem sikerült törölni a szabadságot.");
          return;
        }

        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Váratlan hiba történt.");
      }
    });
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Szabadságok</h1>

        <Button onClick={() => setOpen(true)} disabled={isPending}>
          + Új szabadság
        </Button>
      </div>

      <VacationTable vacations={vacations} onDelete={deleteVacation} />

      <VacationModal open={open} onClose={closeModal} vacation={null} onSubmit={saveVacation} />
    </>
  );
}
