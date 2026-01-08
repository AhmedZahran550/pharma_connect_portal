"use client";

import { Box, Typography, Paper, Grid } from "@mui/material";
import { ChartDataPoint } from "@/types";

// Mock chart data
const MONTHLY_REVENUE: ChartDataPoint[] = [
  { name: "Jan", value: 12500 },
  { name: "Feb", value: 15200 },
  { name: "Mar", value: 18900 },
  { name: "Apr", value: 16400 },
  { name: "May", value: 21000 },
  { name: "Jun", value: 19800 },
];

const CONSULTATIONS_BY_SPECIALTY: ChartDataPoint[] = [
  { name: "Cardiology", value: 120 },
  { name: "Dermatology", value: 95 },
  { name: "Pediatrics", value: 85 },
  { name: "General", value: 150 },
  { name: "Orthopedics", value: 65 },
];

const ORDER_STATUS_DISTRIBUTION: ChartDataPoint[] = [
  { name: "Pending", value: 15 },
  { name: "Processing", value: 25 },
  { name: "Shipped", value: 45 },
  { name: "Delivered", value: 180 },
  { name: "Cancelled", value: 8 },
];

export default function AnalyticsPanel() {
  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((d) => d.value));
  const maxConsultations = Math.max(
    ...CONSULTATIONS_BY_SPECIALTY.map((d) => d.value)
  );
  const totalOrders = ORDER_STATUS_DISTRIBUTION.reduce(
    (sum, d) => sum + d.value,
    0
  );

  const getBarColor = (index: number) => {
    const colors = ["#667eea", "#764ba2", "#f97316", "#22c55e", "#ef4444"];
    return colors[index % colors.length];
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Analytics & Reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View performance metrics and trends
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Monthly Revenue Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Monthly Revenue
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: 2,
                height: 200,
                mt: 2,
              }}
            >
              {MONTHLY_REVENUE.map((data, index) => (
                <Box
                  key={data.name}
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" sx={{ mb: 1 }}>
                    ${(data.value / 1000).toFixed(1)}k
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: `${(data.value / maxRevenue) * 150}px`,
                      bgcolor: "primary.main",
                      borderRadius: "4px 4px 0 0",
                      transition: "height 0.3s",
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {data.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Order Status Distribution */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Order Status Distribution
            </Typography>
            <Box sx={{ mt: 2 }}>
              {ORDER_STATUS_DISTRIBUTION.map((data, index) => (
                <Box key={data.name} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="body2">{data.name}</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {data.value} (
                      {Math.round((data.value / totalOrders) * 100)}%)
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 8,
                      bgcolor: "grey.200",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${(data.value / totalOrders) * 100}%`,
                        height: "100%",
                        bgcolor: getBarColor(index),
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Consultations by Specialty */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Consultations by Specialty
            </Typography>
            <Box sx={{ display: "flex", gap: 3, mt: 2, flexWrap: "wrap" }}>
              {CONSULTATIONS_BY_SPECIALTY.map((data, index) => (
                <Box
                  key={data.name}
                  sx={{
                    flex: "1 1 calc(20% - 24px)",
                    minWidth: 120,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "grey.50",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      bgcolor: getBarColor(index),
                      margin: "0 auto 8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6" color="white" fontWeight={600}>
                      {data.value}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={500}>
                    {data.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
