"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "./user";
import { UserType } from "@/types/User";

export function useUpadateUser() {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<UserType> }) =>
      updateUser(id, payload),
    // onSuccess: (_, variables) => {},
  });
}
