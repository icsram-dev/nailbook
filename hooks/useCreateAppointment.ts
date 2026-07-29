"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAppointment } from "@/lib/api/appointments";

import type { AppointmentSchema } from "@/schemas/appointment";

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AppointmentSchema) =>
      createAppointment(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["availability"],
      });
    },
  });
}