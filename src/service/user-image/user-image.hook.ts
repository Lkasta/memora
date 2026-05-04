"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  deleteUserImage,
  updateUserImage,
  uploadUserImage,
} from "./user-image";

export function useUploadImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadUserImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      if (variables.get("user_id")) {
        queryClient.invalidateQueries({
          queryKey: ["user", Number(variables.get("user_id"))],
        });
      }
    },
  });
}

export function useUpdateUserImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      if (variables.get("user_id")) {
        queryClient.invalidateQueries({
          queryKey: ["user", Number(variables.get("user_id"))],
        });
      }
    },
  });
}

export function useDeleteUserImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserImage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      if (variables.get("user_id")) {
        queryClient.invalidateQueries({
          queryKey: ["user", Number(variables.get("user_id"))],
        });
      }
    },
  });
}
