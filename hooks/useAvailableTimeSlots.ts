import { useQuery } from "@tanstack/react-query";

import type { TimeSlot } from "@/types/time-slot";

type Options = {
  serviceId?: string;
  date?: Date;
};

export function useAvailableTimeSlots({ serviceId, date }: Options) {
  return useQuery<TimeSlot[]>({
    queryKey: ["available-slots", serviceId, date?.toISOString()],

    enabled: !!serviceId && !!date,

    queryFn: async () => {
      const params = new URLSearchParams({
        serviceId: serviceId!,
        date: date!.toISOString(),
      });

      const response = await fetch(`/api/booking/slots?${params}`);

      if (!response.ok) {
        throw new Error("Nem sikerült betölteni az időpontokat.");
      }

      return response.json();
    },
  });
}
