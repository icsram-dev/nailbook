import { z } from "zod";
import { WeekDay } from "@prisma/client";

export const openingHourSchema = z
  .object({
    day: z.nativeEnum(WeekDay),
    isOpen: z.boolean(),
    opensAt: z.string().nullable(),
    closesAt: z.string().nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.isOpen) return;

    if (!data.opensAt) {
      ctx.addIssue({
        code: "custom",
        path: ["opensAt"],
        message: "Add meg a nyitási időt.",
      });
    }

    if (!data.closesAt) {
      ctx.addIssue({
        code: "custom",
        path: ["closesAt"],
        message: "Add meg a zárási időt.",
      });
    }

    if (data.opensAt && data.closesAt && data.opensAt >= data.closesAt) {
      ctx.addIssue({
        code: "custom",
        path: ["closesAt"],
        message: "A zárási időnek későbbinek kell lennie.",
      });
    }
  });

export const openingHoursSchema = z.array(openingHourSchema);

export type OpeningHoursFormValues = z.infer<typeof openingHoursSchema>;
