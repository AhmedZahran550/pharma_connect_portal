"use client";

import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  People,
  LocalHospital,
  ShoppingCart,
  AttachMoney,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";
import { DashboardStats } from "@/types";
import { getInitials } from "@/lib/utils";

// Mock stats data
const MOCK_STATS: DashboardStats = {
  totalDoctors: 24,
  totalPatients: 1250,
  totalOrders: 342,
  revenue: 45680,
  activeConsultations: 8,
  pendingRequests: 15,
};

// Mock recent orders
const RECENT_ORDERS = [
  { id: "1", patient: "Ahmed Mohamed", amount: 125, status: "processing" },
  { id: "2", patient: "Sara Ali", amount: 89, status: "shipped" },
  { id: "3", patient: "Mohamed Hassan", amount: 256, status: "pending" },
  { id: "4", patient: "Fatma Ibrahim", amount: 75, status: "delivered" },
];

// Mock top doctors
const TOP_DOCTORS = [
  {
    id: "1",
    name: "Dr. Ahmed Kamal",
    specialty: "Cardiology",
    consultations: 45,
  },
  {
    id: "2",
    name: "Dr. Mona Saeed",
    specialty: "Dermatology",
    consultations: 38,
  },
  {
    id: "3",
    name: "Dr. Khaled Omar",
    specialty: "Pediatrics",
    consultations: 32,
  },
];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={600}>
              {value}
            </Typography>
            {trend !== undefined && (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}
              >
                {trend >= 0 ? (
                  <TrendingUp sx={{ fontSize: 16, color: "success.main" }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 16, color: "error.main" }} />
                )}
                <Typography
                  variant="caption"
                  color={trend >= 0 ? "success.main" : "error.main"}
                >
                  {Math.abs(trend)}% vs last month
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: `${color}.light`,
              color: `${color}.main`,
              width: 48,
              height: 48,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function OverviewPanel() {
  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Dashboard Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Welcome back! Here&apos;s what&apos;s happening with your pharmacy
        today.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Doctors"
            value={MOCK_STATS.totalDoctors}
            icon={<People />}
            trend={12}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Patients"
            value={MOCK_STATS.totalPatients.toLocaleString()}
            icon={<LocalHospital />}
            trend={8}
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Orders"
            value={MOCK_STATS.totalOrders}
            icon={<ShoppingCart />}
            trend={-5}
            color="warning"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Revenue"
            value={`$${MOCK_STATS.revenue.toLocaleString()}`}
            icon={<AttachMoney />}
            trend={15}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Recent Orders
            </Typography>
            <List disablePadding>
              {RECENT_ORDERS.map((order) => (
                <ListItem key={order.id} disablePadding sx={{ py: 1 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "grey.200" }}>
                      {getInitials(order.patient)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={order.patient}
                    secondary={`$${order.amount}`}
                  />
                  <Chip
                    label={order.status}
                    size="small"
                    color={
                      getOrderStatusColor(order.status) as
                        | "warning"
                        | "info"
                        | "primary"
                        | "success"
                        | "default"
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Top Doctors */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Top Performing Doctors
            </Typography>
            <List disablePadding>
              {TOP_DOCTORS.map((doctor, index) => (
                <ListItem key={doctor.id} disablePadding sx={{ py: 1 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {getInitials(doctor.name)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={doctor.name}
                    secondary={doctor.specialty}
                  />
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="body2" fontWeight={500}>
                      {doctor.consultations}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      consultations
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Active Sessions */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Active Consultations
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Active</Typography>
                <Typography variant="body2" fontWeight={500}>
                  {MOCK_STATS.activeConsultations}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(MOCK_STATS.activeConsultations / 20) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Pending Requests</Typography>
                <Typography variant="body2" fontWeight={500}>
                  {MOCK_STATS.pendingRequests}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(MOCK_STATS.pendingRequests / 30) * 100}
                color="warning"
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
