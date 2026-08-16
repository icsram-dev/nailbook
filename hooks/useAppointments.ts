"use client";

import { useQuery } from "@tanstack/react-query";

import { getAppointments } from "@/lib/api/appointments";

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
}
