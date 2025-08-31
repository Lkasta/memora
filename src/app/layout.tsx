import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { SidebarWrapper } from "@/components/Sidebar/SidebarWrapper";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memora",
  description: "Gerencie memórias pessoais em uma linha do tempo com Memora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} flex antialiased`}>
        <AuthProvider>
          <QueryProvider>
            <SidebarWrapper />
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
