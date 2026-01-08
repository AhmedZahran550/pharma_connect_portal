"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/utils/apiClient";
import { AxiosError } from "axios";
import { PaginatedResponse } from "@/types";

interface UseGetListOptions<T> {
  resource: string;
  params?: Record<string, unknown>;
  enabled?: boolean;
  queryOptions?: Omit<
    UseQueryOptions<PaginatedResponse<T>, AxiosError>,
    "queryKey" | "queryFn"
  >;
}

export function useGetList<T>({
  resource,
  params,
  enabled = true,
  queryOptions,
}: UseGetListOptions<T>) {
  return useQuery<PaginatedResponse<T>, AxiosError>({
    queryKey: [resource, "list", params],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<T>>(resource, {
        params,
      });
      return response.data;
    },
    enabled,
    ...queryOptions,
  });
}
