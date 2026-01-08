"use client";

import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import apiClient from "@/utils/apiClient";
import { AxiosError } from "axios";

interface UseDeleteOptions {
  resource: string;
  mutationOptions?: Omit<
    UseMutationOptions<void, AxiosError, string>,
    "mutationFn"
  >;
}

export function useDelete({ resource, mutationOptions }: UseDeleteOptions) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: async (id: string) => {
      await apiClient.delete(`${resource}/${id}`);
    },
    onSuccess: (data, id, context) => {
      // Invalidate list and remove detail from cache
      queryClient.invalidateQueries({ queryKey: [resource, "list"] });
      queryClient.removeQueries({ queryKey: [resource, "detail", id] });
      // @ts-ignore - bypassing excessive argument check
      (mutationOptions?.onSuccess as any)?.(data, id, context);
    },
    ...mutationOptions,
  });
}
