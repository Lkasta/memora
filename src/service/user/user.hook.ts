"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser } from "./user";
import { UserType } from "@/types/User";

export function useUpadateUser() {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<UserType> }) =>
      updateUser(id, payload),
    // onSuccess: (_, variables) => {},
  });
}

export function useGetUser(id: number | undefined) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id!),
    enabled: !!id,
  });
}
