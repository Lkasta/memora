import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export function useLogin() {
  const loginStore = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post<LoginResponse>("/auth/login", payload);
      return res.data;
    },
    onSuccess: (data) => {
      loginStore.login(data.user, data.token);
      router.replace("/");
    },
  });
}
