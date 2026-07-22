"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Appointment,
  Service,
  User,
} from "@prisma/client";

import type { AppointmentData } from "@/lib/validations/appointment";

import { Button } from "@/components/ui/Button";
import { AppointmentModal } from "./AppointmentModal";
import { AppointmentTable } from "./AppointmentTable";

type AppointmentWithRelations = Appointment & {
  customer: User;
  service: Service;
};

type AppointmentManagerProps = {
  appointments: AppointmentWithRelations[];
  customers: User[];
  services: Service[];
};

export function AppointmentManager({
  appointments,
  customers,
  services,
}: AppointmentManagerProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  async function saveAppointment(
    data: AppointmentData
  ) {
    const isEditing =
      selectedAppointment !== null;

    try {
      const response = await fetch(
        isEditing
          ? `/api/appointments/${selectedAppointment.id}`
          : "/api/appointments",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: {
            "Content-Type":
              "application/json",
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
            } a foglalást.`
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

  async function deleteAppointment(
    id: string
  ) {
    if (
      !window.confirm(
        "Biztosan törölni szeretnéd ezt a foglalást?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `/api/appointments/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        alert(
          "Nem sikerült törölni a foglalást."
        );
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Váratlan hiba történt.");
    }
  }

  function createAppointment() {
    setSelectedAppointment(null);
    setOpen(true);
  }

  function editAppointment(
    appointment: Appointment
  ) {
    setSelectedAppointment(appointment);
    setOpen(true);
  }

  function closeModal() {
    setSelectedAppointment(null);
    setOpen(false);
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Foglalások
        </h1>

        <Button
          onClick={createAppointment}
        >
          + Új foglalás
        </Button>
      </div>

      <AppointmentTable
        appointments={appointments}
        onEdit={editAppointment}
        onDelete={deleteAppointment}
      />

      <AppointmentModal
        open={open}
        onClose={closeModal}
        appointment={selectedAppointment}
        customers={customers}
        services={services}
        onSubmit={saveAppointment}
      />
    </>
  );
}