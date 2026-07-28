import { WeekDay } from "@prisma/client";
import { z } from "zod";

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
        code: z.ZodIssueCode.custom,
        path: ["opensAt"],
        message: "A nyitási idő megadása kötelező.",
      });
    }

    if (!data.closesAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["closesAt"],
        message: "A zárási idő megadása kötelező.",
      });
    }

    if (
      data.opensAt &&
      data.closesAt &&
      data.opensAt >= data.closesAt
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["closesAt"],
        message:
          "A zárási időnek későbbinek kell lennie, mint a nyitási idő.",
      });
    }
  });

export const openingHoursSchema = z.array(openingHourSchema);

export type OpeningHourFormValues = z.infer<
  typeof openingHourSchema
>;

export type OpeningHoursFormValues = z.infer<
  typeof openingHoursSchema
>;