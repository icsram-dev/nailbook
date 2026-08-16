"use client";

import { useTransition } from "react";

import { WeekDay, type OpeningHour } from "@prisma/client";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { updateOpeningHours } from "@/app/admin/opening-hours/actions";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/checkbox";

type OpeningHoursTableProps = {
  openingHours: OpeningHour[];
};

type FormValues = {
  openingHours: OpeningHour[];
};

const DAY_NAMES: Record<WeekDay, string> = {
  MONDAY: "Hétfő",
  TUESDAY: "Kedd",
  WEDNESDAY: "Szerda",
  THURSDAY: "Csütörtök",
  FRIDAY: "Péntek",
  SATURDAY: "Szombat",
  SUNDAY: "Vasárnap",
};

export default function OpeningHoursTable({ openingHours }: OpeningHoursTableProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    defaultValues: {
      openingHours,
    },
  });

  const { control, register, handleSubmit } = form;

  const { fields } = useFieldArray({
    control,
    name: "openingHours",
  });

  function onSubmit(data: FormValues) {
    startTransition(async () => {
      await updateOpeningHours(
        data.openingHours.map((day) => ({
          day: day.day,
          isOpen: day.isOpen,
          opensAt: day.opensAt,
          closesAt: day.closesAt,
        }))
      );
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="px-6 py-4 text-left">Nap</th>

            <th className="px-6 py-4 text-center">Nyitva</th>

            <th className="px-6 py-4 text-center">Nyitás</th>

            <th className="px-6 py-4 text-center">Zárás</th>
          </tr>
        </thead>

        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id} className="border-b last:border-0">
              <td className="px-6 py-4 font-medium">{DAY_NAMES[field.day]}</td>

              <td className="px-6 py-4 text-center">
                <Controller
                  control={control}
                  name={`openingHours.${index}.isOpen`}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                    />
                  )}
                />
              </td>

              <td className="px-6 py-4">
                <Input type="time" {...register(`openingHours.${index}.opensAt`)} />
              </td>

              <td className="px-6 py-4">
                <Input type="time" {...register(`openingHours.${index}.closesAt`)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end border-t p-6">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Mentés..." : "Nyitvatartás mentése"}
        </Button>
      </div>
    </form>
  );
}
