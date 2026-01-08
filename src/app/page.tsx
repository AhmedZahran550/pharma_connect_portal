"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
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
    } else if (user?.role === "doctor") {
      router.push("/doctor");
    } else if (user?.role === "admin") {
      router.push("/admin");
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
