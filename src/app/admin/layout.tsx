"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { useAppUserStore } from "@/stores/AppUserStore";
import ClientWrapper from "../ClientWrapper";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAppUserStore();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Redirect if not an admin
    if (user?.role !== "admin") {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  // Don't render until auth is verified
  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <ClientWrapper>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </ClientWrapper>
  );
}
