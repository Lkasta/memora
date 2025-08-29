"use client";

import { Sidebar } from "@/components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

export function SidebarWrapper() {
  const route = usePathname();
  if (route === "/login") return null;
  return <Sidebar />;
}
