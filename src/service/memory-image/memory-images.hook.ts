"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  deleteMemorieImage,
  updateMemorieImage,
  uploadMemorieImage,
} from "./memory-image";

export function useUploadImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadMemorieImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["memories"] });
      if (variables.get("memorie_id")) {
        queryClient.invalidateQueries({
          queryKey: ["memories", variables.get("memorie_id")],
        });
      }
    },
  });
}

export function useUpdateImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMemorieImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["memories"] });
      if (variables.get("memorie_id")) {
        queryClient.invalidateQueries({
          queryKey: ["memories", variables.get("memorie_id")],
        });
      }
    },
  });
}

export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMemorieImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["memories"] });

      if (variables.get("memorie_id")) {
        queryClient.invalidateQueries({
          queryKey: ["memories", variables.get("memorie_id")],
        });
      }
    },
  });
}
