"use client";

import api from "@/lib/api";

type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export async function registerUser(payload: RegisterPayload) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}
