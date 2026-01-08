"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { useAppUserStore } from "@/stores/AppUserStore";
import ClientWrapper from "../ClientWrapper";
import DoctorSidebar from "@/components/doctor/Sidebar";

interface DoctorLayoutProps {
  children: ReactNode;
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAppUserStore();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Redirect if not a doctor
    if (user?.role !== "doctor") {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  // Don't render until auth is verified
  if (!isAuthenticated || user?.role !== "doctor") {
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
        <DoctorSidebar />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </ClientWrapper>
  );
}
