"use client";

import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import apiClient from "@/utils/apiClient";
import { AxiosError } from "axios";

interface UpdateVariables<T> {
  id: string;
  data: Partial<T>;
}

interface UseUpdateOptions<T> {
  resource: string;
  mutationOptions?: Omit<
    UseMutationOptions<T, AxiosError, UpdateVariables<T>>,
    "mutationFn"
  >;
}

export function useUpdate<T>({
  resource,
  mutationOptions,
}: UseUpdateOptions<T>) {
  const queryClient = useQueryClient();

  return useMutation<T, AxiosError, UpdateVariables<T>>({
    mutationFn: async ({ id, data }: UpdateVariables<T>) => {
      const response = await apiClient.patch<T>(`${resource}/${id}`, data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      // Invalidate both list and detail queries
      queryClient.invalidateQueries({ queryKey: [resource, "list"] });
      queryClient.invalidateQueries({
        queryKey: [resource, "detail", variables.id],
      });
      mutationOptions?.onSuccess?.(data, variables, context);
    },
    ...mutationOptions,
  });
}
