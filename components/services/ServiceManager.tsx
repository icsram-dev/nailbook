"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Service } from "@prisma/client";

import type { ServiceData } from "@/lib/validations/service";

import { Button } from "@/components/ui/Button";
import { ServiceTable } from "./ServiceTable";
import { ServiceModal } from "./ServiceModal";

type ServiceManagerProps = {
  services: Service[];
};

export function ServiceManager({
  services,
}: ServiceManagerProps) {
  const [open, setOpen] = useState(false);

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const router = useRouter();

  async function saveService(data: ServiceData) {
    const isEditing = selectedService !== null;

    try {
      const response = await fetch(
        isEditing
          ? `/api/services/${selectedService.id}`
          : "/api/services",
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
            } a szolgáltatást.`
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

  async function deleteService(id: string) {
    const confirmed = window.confirm(
      "Biztosan törölni szeretnéd ezt a szolgáltatást?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/services/${id}`,
        {
          method: "DELETE",
        }
      );

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
        <h1 className="text-2xl font-bold">
          Szolgáltatások
        </h1>

        <Button onClick={createService}>
          + Új szolgáltatás
        </Button>
      </div>

      <ServiceTable
        services={services}
        onEdit={editService}
        onDelete={deleteService}
      />

      <ServiceModal
        open={open}
        onClose={closeModal}
        service={selectedService}
        onSubmit={saveService}
      />
    </>
  );
}