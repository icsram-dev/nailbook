"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  serviceSchema,
  type ServiceInput,
  type ServiceData,
} from "@/lib/validations/service";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type ServiceFormProps = {
  onSubmit: (data: ServiceData) => Promise<void>;
  defaultValues?: ServiceInput;
};

export function ServiceForm({
  onSubmit,
  defaultValues,
}: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceInput, unknown, ServiceData>({
    resolver: zodResolver(serviceSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          Szolgáltatás neve
        </label>

        <Input {...register("name")} />

        {errors.name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Leírás
        </label>

        <Textarea
          rows={3}
          {...register("description")}
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Időtartam (perc)
        </label>

        <Input
          type="number"
          {...register("duration")}
        />

        {errors.duration && (
          <p className="mt-1 text-sm text-red-600">
            {errors.duration.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Ár (Ft)
        </label>

        <Input
          type="number"
          {...register("price")}
        />

        {errors.price && (
          <p className="mt-1 text-sm text-red-600">
            {errors.price.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="active"
          type="checkbox"
          {...register("active")}
        />

        <label htmlFor="active">
          Aktív szolgáltatás
        </label>
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