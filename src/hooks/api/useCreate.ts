"use client";

import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import apiClient from "@/utils/apiClient";
import { AxiosError } from "axios";

interface UseCreateOptions<T, TData = Partial<T>> {
  resource: string;
  mutationOptions?: Omit<
    UseMutationOptions<T, AxiosError, TData>,
    "mutationFn"
  >;
}

export function useCreate<T, TData = Partial<T>>({
  resource,
  mutationOptions,
}: UseCreateOptions<T, TData>) {
  const queryClient = useQueryClient();

  return useMutation<T, AxiosError, TData>({
    mutationFn: async (data: TData) => {
      const response = await apiClient.post<T>(resource, data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      // Invalidate list queries for this resource
      queryClient.invalidateQueries({ queryKey: [resource, "list"] });
      // @ts-ignore - bypassing excessive argument check
      (mutationOptions?.onSuccess as any)?.(data, variables, context);
    },
    ...mutationOptions,
  });
}
