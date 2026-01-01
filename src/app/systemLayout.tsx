"use client";

import { ReactNode } from "react";
import { Box } from "@mui/material";

interface SystemLayoutProps {
  children: ReactNode;
}

export default function SystemLayout({ children }: SystemLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Navigation Sidebar will go here */}
      <Box
        component="aside"
        sx={{
          width: 240,
          flexShrink: 0,
          backgroundColor: "#1976d2",
          color: "white",
        }}
      >
        {/* Drawer/Navigation content */}
      </Box>

      {/* Main Content Area */}
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
  );
}
