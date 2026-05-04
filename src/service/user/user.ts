"use client";

import api from "@/lib/api";
import { UserType } from "@/types/User";

export async function updateUser(id: number, payload: Partial<UserType>) {
  const { data } = await api.put(`/user/${id}`, payload);
  return data;
}

export async function getUser(id: number) {
  const { data } = await api.get(`/user/${id}`);
  return data;
}
