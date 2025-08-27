"use client";

import api from "@/lib/api";
import { MemorieType } from "@/types/Memorie";

export async function getMemories(): Promise<MemorieType[]> {
  const { data } = await api.get("/memories");
  return data;
}

export async function getMemorieById(id: number): Promise<MemorieType> {
  const { data } = await api.get(`/memories/${id}`);
  return data;
}

export async function createMemorie(payload: Partial<MemorieType>) {
  const { data } = await api.post("/memories", payload);
  return data;
}

export async function updateMemorie(id: number, payload: Partial<MemorieType>) {
  const { data } = await api.put(`/memories/${id}`, payload);
  return data;
}
