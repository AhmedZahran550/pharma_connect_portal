"use client";

import { useGetList as useGetListHook } from "./api/useGetList";
import { useGetOne as useGetOneHook } from "./api/useGetOne";
import { useCreate as useCreateHook } from "./api/useCreate";
import { useUpdate as useUpdateHook } from "./api/useUpdate";
import { useDelete as useDeleteHook } from "./api/useDelete";
import { PaginatedResponse } from "@/types";
import { UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseApiResourceOptions {
  resource: string;
}

interface GetAllOptions<T> {
  params?: Record<string, unknown>;
  enabled?: boolean;
  queryOptions?: Omit<
    UseQueryOptions<PaginatedResponse<T>, AxiosError>,
    "queryKey" | "queryFn"
  >;
}

interface GetOneOptions<T> {
  enabled?: boolean;
  queryOptions?: Omit<UseQueryOptions<T, AxiosError>, "queryKey" | "queryFn">;
}

interface CreateOptions<T, TData = Partial<T>> {
  mutationOptions?: Omit<
    UseMutationOptions<T, AxiosError, TData>,
    "mutationFn"
  >;
}

interface UpdateOptions<T> {
  mutationOptions?: Omit<
    UseMutationOptions<T, AxiosError, { id: string; data: Partial<T> }>,
    "mutationFn"
  >;
}

interface DeleteOptions {
  mutationOptions?: Omit<
    UseMutationOptions<void, AxiosError, string>,
    "mutationFn"
  >;
}

/**
 * Generic API resource hook that provides all CRUD operations for a resource.
 *
 * @example
 * ```tsx
 * const ordersApi = useApiResource<Order>({ resource: '/orders' });
 *
 * // Fetch all orders
 * const { data, isLoading } = ordersApi.getAll({ params: { status: 'pending' } });
 *
 * // Fetch single order
 * const { data: order } = ordersApi.getOne('123');
 *
 * // Create order
 * const createMutation = ordersApi.useCreate();
 * await createMutation.mutateAsync({ items: [...] });
 *
 * // Update order
 * const updateMutation = ordersApi.useUpdate();
 * await updateMutation.mutateAsync({ id: '123', data: { status: 'shipped' } });
 *
 * // Delete order
 * const deleteMutation = ordersApi.useDelete();
 * await deleteMutation.mutateAsync('123');
 * ```
 */
export function useApiResource<T>({ resource }: UseApiResourceOptions) {
  return {
    /**
     * Fetch paginated list of resources
     */
    getAll: (options?: GetAllOptions<T>) =>
      useGetListHook<T>({
        resource,
        params: options?.params,
        enabled: options?.enabled,
        queryOptions: options?.queryOptions,
      }),

    /**
     * Fetch single resource by ID
     */
    getOne: (id: string | undefined, options?: GetOneOptions<T>) =>
      useGetOneHook<T>({
        resource,
        id,
        enabled: options?.enabled,
        queryOptions: options?.queryOptions,
      }),

    /**
     * Get create mutation hook
     */
    useCreate: <TData = Partial<T>>(options?: CreateOptions<T, TData>) =>
      useCreateHook<T, TData>({
        resource,
        mutationOptions: options?.mutationOptions,
      }),

    /**
     * Get update mutation hook
     */
    useUpdate: (options?: UpdateOptions<T>) =>
      useUpdateHook<T>({
        resource,
        mutationOptions: options?.mutationOptions,
      }),

    /**
     * Get delete mutation hook
     */
    useDelete: (options?: DeleteOptions) =>
      useDeleteHook({
        resource,
        mutationOptions: options?.mutationOptions,
      }),
  };
}
