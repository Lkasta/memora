"use client";

import api from "@/lib/api";

export async function uploadMemorieImage(payload: FormData) {
  const { data } = await api.post("/images/", payload);
  return data;
}
