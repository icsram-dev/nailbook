"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { vacationSchema } from "@/lib/validations/vacation";
import type { VacationInput } from "@/lib/validations/vacation";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type VacationFormProps = {
  onSubmit: (data: VacationInput) => Promise<void>;
  defaultValues?: VacationInput;
};

export function VacationForm({
  onSubmit,
  defaultValues,
}: VacationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VacationInput>({
    resolver: zodResolver(vacationSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          Kezdő dátum
        </label>

        <Input
          type="date"
          {...register("startDate")}
        />

        {errors.startDate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.startDate.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Befejező dátum
        </label>

        <Input
          type="date"
          {...register("endDate")}
        />

        {errors.endDate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.endDate.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Megjegyzés
        </label>

        <Textarea
          rows={3}
          {...register("reason")}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Mentés..." : "Mentés"}
      </Button>
    </form>
  );
}