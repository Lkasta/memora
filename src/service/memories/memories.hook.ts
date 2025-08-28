"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMemories,
  getMemorieById,
  createMemorie,
  updateMemorie,
} from "./memories";
import { MemorieType } from "@/types/Memorie";

export function useMemories() {
  return useQuery<MemorieType[]>({
    queryKey: ["memories"],
    queryFn: getMemories,
  });
}

export function useMemorie(id: number) {
  return useQuery<MemorieType>({
    queryKey: ["memories", id],
    queryFn: () => getMemorieById(id),
    enabled: !!id,
  });
}

export function useCreateMemorie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMemorie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memories"] });
    },
  });
}

export function useUpdateMemorie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<MemorieType>;
    }) => updateMemorie(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["memories"] });
      queryClient.invalidateQueries({ queryKey: ["memories", variables.id] });
    },
  });
}
