"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Switch,
  Divider,
  Badge,
  Chip,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Chat,
  Description,
  Logout,
  Circle,
  ChevronRight,
} from "@mui/icons-material";
import { useAppUserStore } from "@/stores/AppUserStore";
import { useLogout } from "@/hooks/useAuth";
import { Consultation, ServiceRequest } from "@/types";
import { formatRelativeTime, getInitials } from "@/lib/utils";

interface SidebarProps {
  consultations?: Consultation[];
  serviceRequests?: ServiceRequest[];
  activeTab?: "consultations" | "service-requests";
  onTabChange?: (tab: "consultations" | "service-requests") => void;
  selectedId?: string;
  onSelect?: (id: string) => void;
  isAvailable?: boolean;
  onAvailabilityChange?: (available: boolean) => void;
}

// Mock data for demo
const MOCK_CONSULTATIONS: Consultation[] = [
  {
    id: "1",
    patientName: "Ahmed Mohamed",
    patientAvatar: "",
    status: "active",
    startTime: new Date(),
    lastMessage: "I have been experiencing headaches...",
    messages: [],
    medicalProfile: {
      id: "mp1",
      userId: "u1",
      bloodType: "A+",
      allergies: ["Penicillin"],
      medications: [],
      conditions: [],
    },
  },
  {
    id: "2",
    patientName: "Sara Ali",
    patientAvatar: "",
    status: "pending",
    startTime: new Date(Date.now() - 7200000),
    lastMessage: "Need prescription refill",
    messages: [],
    medicalProfile: {
      id: "mp2",
      userId: "u2",
      bloodType: "O-",
      allergies: [],
      medications: [],
      conditions: [],
    },
  },
];

const MOCK_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: "sr1",
    patientName: "Mohamed Hassan",
    patientAvatar: "",
    status: "pending",
    uploadTime: new Date(Date.now() - 1800000),
    prescriptionImages: ["/prescription1.jpg"],
    medicalProfile: {
      id: "mp3",
      userId: "u3",
      bloodType: "B+",
      allergies: [],
      medications: [],
      conditions: [],
    },
    messages: [],
  },
];

export default function DoctorSidebar({
  consultations = MOCK_CONSULTATIONS,
  serviceRequests = MOCK_SERVICE_REQUESTS,
  activeTab = "consultations",
  onTabChange,
  selectedId,
  onSelect,
  isAvailable = true,
  onAvailabilityChange,
}: SidebarProps) {
  const router = useRouter();
  const { user } = useAppUserStore();
  const logoutMutation = useLogout();
  const [currentTab, setCurrentTab] = useState<number>(
    activeTab === "consultations" ? 0 : 1
  );
  const [available, setAvailable] = useState(isAvailable);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    onTabChange?.(newValue === 0 ? "consultations" : "service-requests");
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.push("/login");
  };

  const handleAvailabilityToggle = () => {
    const newValue = !available;
    setAvailable(newValue);
    onAvailabilityChange?.(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "pending":
        return "warning";
      case "completed":
        return "default";
      default:
        return "default";
    }
  };

  const items = currentTab === 0 ? consultations : serviceRequests;

  return (
    <Box
      sx={{
        width: 320,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Header with user info */}
      <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Circle
                sx={{
                  fontSize: 12,
                  color: available ? "success.main" : "grey.500",
                }}
              />
            }
          >
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {user?.name ? getInitials(user.name) : "DR"}
            </Avatar>
          </Badge>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Dr. {user?.name || "Doctor"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.specialty || "General Practitioner"}
            </Typography>
          </Box>
        </Box>

        {/* Availability toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "action.hover",
            borderRadius: 1,
            px: 1.5,
            py: 0.5,
          }}
        >
          <Typography variant="body2">
            {available ? "Available" : "Offline"}
          </Typography>
          <Switch
            size="small"
            checked={available}
            onChange={handleAvailabilityToggle}
            color="success"
          />
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Tab
          icon={<Chat sx={{ fontSize: 18 }} />}
          iconPosition="start"
          label={`Consultations (${consultations.length})`}
          sx={{ minHeight: 48, fontSize: 12 }}
        />
        <Tab
          icon={<Description sx={{ fontSize: 18 }} />}
          iconPosition="start"
          label={`Requests (${serviceRequests.length})`}
          sx={{ minHeight: 48, fontSize: 12 }}
        />
      </Tabs>

      {/* Queue List */}
      <List sx={{ flexGrow: 1, overflow: "auto", p: 1 }}>
        {items.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={selectedId === item.id}
              onClick={() => onSelect?.(item.id)}
              sx={{
                borderRadius: 1,
                "&.Mui-selected": {
                  bgcolor: "primary.light",
                  "&:hover": { bgcolor: "primary.light" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Avatar sx={{ width: 36, height: 36, bgcolor: "grey.300" }}>
                  {getInitials(item.patientName)}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {item.patientName}
                    </Typography>
                    <Chip
                      label={item.status}
                      size="small"
                      color={
                        getStatusColor(item.status) as
                          | "success"
                          | "warning"
                          | "default"
                      }
                      sx={{ height: 20, fontSize: 10 }}
                    />
                  </Box>
                }
                secondary={
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {"startTime" in item
                      ? formatRelativeTime(item.startTime)
                      : formatRelativeTime(item.uploadTime)}
                  </Typography>
                }
              />
              <ChevronRight sx={{ color: "text.secondary", fontSize: 18 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Logout */}
      <Box sx={{ p: 1 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{ borderRadius: 1, color: "error.main" }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Logout color="error" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
}
