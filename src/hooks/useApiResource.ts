import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface UseApiResourceOptions<T> {
  baseUrl: string;
  resourceName: string;
  enabled?: boolean;
}

export function useApiResource<T>({
  baseUrl,
  resourceName,
  enabled = true,
}: UseApiResourceOptions<T>) {
  const queryClient = useQueryClient();

  const queryKey = [resourceName];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axios.get<T[]>(baseUrl);
      return response.data;
    },
    enabled,
  });

  const createMutation = useMutation({
    mutationFn: async (newItem: Partial<T>) => {
      const response = await axios.post<T>(baseUrl, newItem);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<T> }) => {
      const response = await axios.patch<T>(`${baseUrl}/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${baseUrl}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    data,
    isLoading,
    error,
    refetch,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
