"use client";

import { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import ClientWrapper from "./ClientWrapper";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <ClientWrapper>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            py: 4,
          }}
        >
          {children}
        </Container>
      </Box>
    </ClientWrapper>
  );
}
