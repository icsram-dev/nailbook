"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Service } from "@prisma/client";

import type { ServiceData } from "@/lib/validations/service";

import {
  createServiceAction,
  updateServiceAction,
  deleteServiceAction,
} from "@/app/admin/services/actions";

import { Button } from "@/components/ui/Button";

import { ServiceModal } from "./ServiceModal";
import { ServiceTable } from "./ServiceTable";

type ServiceManagerProps = {
  services: Service[];
};

export function ServiceManager({ services }: ServiceManagerProps) {
  const [open, setOpen] = useState(false);

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  async function saveService(data: ServiceData) {
    startTransition(async () => {
      try {
        if (selectedService) {
          await updateServiceAction(selectedService.id, data);
        } else {
          await createServiceAction(data);
        }

        closeModal();
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Hiba történt a mentés során.");
      }
    });
  }

  async function deleteService(id: string) {
    const confirmed = window.confirm("Biztosan törölni szeretnéd ezt a szolgáltatást?");

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await deleteServiceAction(id);

        if (!result.success) {
          alert(result.message);
          return;
        }

        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Váratlan hiba történt.");
      }
    });
  }

  function createService() {
    setSelectedService(null);
    setOpen(true);
  }

  function editService(service: Service) {
    setSelectedService(service);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setSelectedService(null);
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Szolgáltatások</h2>

        <Button onClick={createService} disabled={isPending}>
          + Új szolgáltatás
        </Button>
      </div>

      <ServiceTable services={services} onEdit={editService} onDelete={deleteService} />

      <ServiceModal
        open={open}
        onClose={closeModal}
        service={selectedService}
        onSubmit={saveService}
      />
    </>
  );
}
