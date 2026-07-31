"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/Button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  appointmentId: string;
};

export default function DeleteAppointmentButton({
  appointmentId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/admin/appointments/${appointmentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Foglalás sikeresen törölve.");

      router.push("/admin/appointments");
      router.refresh();
    } catch {
      toast.error("Nem sikerült törölni a foglalást.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
  render={
    <Button variant="destructive">
      Törlés
    </Button>
  }
/>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Foglalás törlése
          </AlertDialogTitle>

          <AlertDialogDescription>
            Biztosan törölni szeretnéd ezt a foglalást?
            Ez a művelet nem vonható vissza.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Mégse
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Törlés..." : "Törlés"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}