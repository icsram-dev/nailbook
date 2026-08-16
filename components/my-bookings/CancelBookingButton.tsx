"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function CancelBookingButton({ appointmentId }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCancel() {
    try {
      setLoading(true);

      const res = await fetch(`/api/my-bookings/${appointmentId}/cancel`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Lemondási hiba:", data);

        throw new Error(data.error ?? "Nem sikerült lemondani az időpontot.");
      }

      toast.success("Az időpont sikeresen le lett mondva.");

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(error instanceof Error ? error.message : "Nem sikerült lemondani az időpontot.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="destructive" size="sm" disabled={loading}>
            Lemondás
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Biztosan le szeretnéd mondani?</AlertDialogTitle>

          <AlertDialogDescription>Ez a művelet nem vonható vissza.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Mégse</AlertDialogCancel>

          <AlertDialogAction onClick={handleCancel} disabled={loading}>
            {loading ? "Lemondás..." : "Igen, lemondom"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
