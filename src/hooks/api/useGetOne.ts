"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/utils/apiClient";
import { AxiosError } from "axios";

interface UseGetOneOptions<T> {
  resource: string;
  id: string | undefined;
  enabled?: boolean;
  queryOptions?: Omit<UseQueryOptions<T, AxiosError>, "queryKey" | "queryFn">;
}

export function useGetOne<T>({
  resource,
  id,
  enabled = true,
  queryOptions,
}: UseGetOneOptions<T>) {
  return useQuery<T, AxiosError>({
    queryKey: [resource, "detail", id],
    queryFn: async () => {
      const response = await apiClient.get<T>(`${resource}/${id}`);
      return response.data;
    },
    enabled: enabled && !!id,
    ...queryOptions,
  });
}
