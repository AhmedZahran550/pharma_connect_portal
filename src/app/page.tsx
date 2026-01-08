"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import { UserRole } from "@/types";

import { useAppUserStore } from "@/stores/AppUserStore";
import ClientWrapper from "./ClientWrapper";

function RedirectHandler() {
  const router = useRouter();
  const { user, isAuthenticated } = useAppUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Redirect based on auth state
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.roles?.includes(UserRole.PROVIDER_DOCTOR)) {
      router.push("/doctor");
    } else if (
      user?.roles?.some((role) =>
        [
          UserRole.PROVIDER_ADMIN,
          UserRole.ADMIN,
          UserRole.SUPER_ADMIN,
          UserRole.SYSTEM_ADMIN,
          UserRole.SYSTEM_USER,
        ].includes(role as UserRole)
      )
    ) {
      router.push("/admin");
    } else if (user?.role === UserRole.PROVIDER_DOCTOR) {
      // Backward compatibility
      router.push("/doctor");
    } else if (user?.role === "admin") {
      // keeping 'admin' as it might be from legacy enum not fully covered or UserRole.ADMIN
      // actually 'admin' matches UserRole.ADMIN value 'ADMIN'? No, UserRole.ADMIN is 'ADMIN'. Backward compat might be lowercase 'admin'.
      // The UserRole enum has ADMIN='ADMIN'. Types.ts has UserRole type?
      // Let's stick to strict replacement where we are sure.
      // The previous code had `user?.role === "admin"`.
      router.push("/admin");
    } else {
      router.push("/home"); // Default dashboard or home
    }
  }, [mounted, isAuthenticated, user, router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        gap: 2,
      }}
    >
      <CircularProgress sx={{ color: "white" }} />
      <Typography variant="body1" color="white">
        Redirecting...
      </Typography>
    </Box>
  );
}

export default function Home() {
  return (
    <ClientWrapper>
      <RedirectHandler />
    </ClientWrapper>
  );
}
