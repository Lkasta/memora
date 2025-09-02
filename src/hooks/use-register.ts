import { registerUser } from "@/service/auth/register";
import { useMutation } from "@tanstack/react-query";

export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
  });
}
