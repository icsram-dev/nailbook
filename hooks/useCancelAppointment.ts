import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cancelAppointment } from "@/lib/api/appointments";

export function useCancelAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
}