"use client";

import api from "@/lib/api";
import { UserType } from "@/types/User";

/**
 * Raw shape returned by GET /user/:id. The backend names these fields
 * differently from everywhere else (login response, PUT payload) - kept
 * private to this module so the rest of the app only ever sees UserType.
 */
type UserResponse = {
  id: number;
  name: string;
  lastname: string | null;
  email: string;
  image: string | null;
};

function mapUserResponse(data: UserResponse): UserType {
  return {
    id: data.id,
    username: data.name,
    lastname: data.lastname ?? undefined,
    email: data.email,
    profile_image_url: data.image ?? undefined,
  };
}

export async function updateUser(
  id: number,
  payload: Partial<UserType>,
): Promise<{ message: string }> {
  const { data } = await api.put<{ message: string }>(`/user/${id}`, payload);
  return data;
}

export async function getUser(id: number): Promise<UserType> {
  const { data } = await api.get<UserResponse>(`/user/${id}`);
  return mapUserResponse(data);
}
