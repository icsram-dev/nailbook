import { endOfDay, startOfDay } from "date-fns";

import { prisma } from "@/lib/prisma";

interface CheckVacationParams {
  startTime: Date;
  endTime: Date;
}

export async function checkVacation({ startTime, endTime }: CheckVacationParams): Promise<boolean> {
  const vacation = await prisma.vacation.findFirst({
    where: {
      startDate: {
        lte: endOfDay(endTime),
      },
      endDate: {
        gte: startOfDay(startTime),
      },
    },
    select: {
      id: true,
    },
  });

  return vacation !== null;
}
