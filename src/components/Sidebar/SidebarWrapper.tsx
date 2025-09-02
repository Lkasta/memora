"use client";

import { Sidebar } from "@/components/Sidebar/Sidebar";
import { publicRoutes } from "@/utils/routes";
import { usePathname } from "next/navigation";

export function SidebarWrapper() {
  const pathname = usePathname();

  if (publicRoutes.includes(pathname)) return null;
  return <Sidebar />;
}
