"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  customerSchema,
  type CustomerInput,
  type CustomerData,
} from "@/lib/validations/customer";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type CustomerFormProps = {
  onSubmit: (data: CustomerData) => Promise<void>;
  defaultValues?: CustomerInput;
};

export function CustomerForm({
  onSubmit,
  defaultValues,
}: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerInput, unknown, CustomerData>({
    resolver: zodResolver(customerSchema),
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
          Név
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
          E-mail
        </label>

        <Input
          type="email"
          {...register("email")}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Telefonszám
        </label>

        <Input {...register("phone")} />

        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">
            {errors.phone.message}
          </p>
        )}
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