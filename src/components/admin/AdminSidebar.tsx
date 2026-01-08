"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  People,
  ShoppingCart,
  BarChart,
  Settings,
  Logout,
  LocalHospital,
} from "@mui/icons-material";
import { useAppUserStore } from "@/stores/AppUserStore";
import { useLogout } from "@/hooks/useAuth";
import { AdminView } from "@/types";
import { getInitials } from "@/lib/utils";

interface AdminSidebarProps {
  activeView?: AdminView;
  onViewChange?: (view: AdminView) => void;
}

const MENU_ITEMS: { view: AdminView; label: string; icon: React.ReactNode }[] =
  [
    { view: "overview", label: "Overview", icon: <Dashboard /> },
    { view: "doctors", label: "Doctors", icon: <People /> },
    { view: "orders", label: "Orders", icon: <ShoppingCart /> },
    { view: "analytics", label: "Analytics", icon: <BarChart /> },
    { view: "settings", label: "Settings", icon: <Settings /> },
  ];

export default function AdminSidebar({
  activeView = "overview",
  onViewChange,
}: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppUserStore();
  const logoutMutation = useLogout();
  const [currentView, setCurrentView] = useState<AdminView>(activeView);

  const handleViewChange = (view: AdminView) => {
    setCurrentView(view);
    onViewChange?.(view);
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.push("/login");
  };

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "primary.main",
        color: "white",
      }}
    >
      {/* Logo Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            bgcolor: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LocalHospital />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            Pharma Connect
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Admin Portal
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* Navigation Menu */}
      <List sx={{ flexGrow: 1, p: 1 }}>
        {MENU_ITEMS.map((item) => (
          <ListItem key={item.view} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={currentView === item.view}
              onClick={() => handleViewChange(item.view)}
              sx={{
                borderRadius: 1,
                "&.Mui-selected": {
                  bgcolor: "rgba(255,255,255,0.15)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                },
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* User Section */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
            p: 1.5,
            borderRadius: 1,
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main", width: 36, height: 36 }}>
            {user?.name ? getInitials(user.name) : "AD"}
          </Avatar>
          <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
            <Typography variant="body2" fontWeight={500} noWrap>
              {user?.name || "Admin"}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }} noWrap>
              {user?.email || "admin@pharma.com"}
            </Typography>
          </Box>
        </Box>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            color: "error.light",
            "&:hover": { bgcolor: "rgba(244,67,54,0.1)" },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
}
