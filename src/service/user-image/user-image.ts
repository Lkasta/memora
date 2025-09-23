"use client";

import api from "@/lib/api";

export async function uploadUserImage(payload: FormData) {
  const { data } = await api.post("/user-image/", payload);
  return data;
}

export async function updateUserImage(payload: FormData) {
  const { data } = await api.put("/user-image/", payload);
  return data;
}

export async function deleteUserImage(payload: FormData) {
  const { data } = await api.delete("/user-image/", {
    data: payload,
  });
  return data;
}
