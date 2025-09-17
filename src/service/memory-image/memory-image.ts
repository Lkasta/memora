"use client";

import api from "@/lib/api";

export async function uploadMemorieImage(payload: FormData) {
  const { data } = await api.post("/images/", payload);
  return data;
}

export async function updateMemorieImage(payload: FormData) {
  const { data } = await api.put("/images/", payload);
  return data;
}

export async function deleteMemorieImage(payload: FormData) {
  const { data } = await api.delete("/images/", {
    data: payload,
  });
  return data;
}
