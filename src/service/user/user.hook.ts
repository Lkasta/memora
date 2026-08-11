"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser } from "./user";
import { UserType } from "@/types/User";

export function useUpadateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<UserType> }) =>
      updateUser(id, payload),
    onSuccess: (_, variables) => {
      // Without this the Settings page (and anything else reading
      // useGetUser) keeps showing stale data until a full page reload.
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });
}

export function useGetUser(id: number | undefined) {
  return useQuery<UserType>({
    queryKey: ["user", id],
    queryFn: () => getUser(id!),
    enabled: !!id,
  });
}
