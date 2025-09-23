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
      queryClient.invalidateQueries({ queryKey: ["Users"] });
      if (variables.get("User_id")) {
        queryClient.invalidateQueries({
          queryKey: ["Users", variables.get("User_id")],
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
      queryClient.invalidateQueries({ queryKey: ["Users"] });
      if (variables.get("User_id")) {
        queryClient.invalidateQueries({
          queryKey: ["Users", variables.get("User_id")],
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
      queryClient.invalidateQueries({ queryKey: ["Users"] });

      if (variables.get("User_id")) {
        queryClient.invalidateQueries({
          queryKey: ["Users", variables.get("User_id")],
        });
      }
    },
  });
}
