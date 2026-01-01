"use client";

import { useForm, UseFormProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";

interface UseAppFormOptions<T extends FieldValues> extends Omit<
  UseFormProps<T>,
  "resolver"
> {
  schema?: ZodType<T>;
}

export function useAppForm<T extends FieldValues>({
  schema,
  ...formOptions
}: UseAppFormOptions<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useForm<T>({
    ...formOptions,
    resolver: schema ? zodResolver(schema as any) : undefined,
  });
}
