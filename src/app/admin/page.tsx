"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { AdminView } from "@/types";
import OverviewPanel from "@/components/admin/OverviewPanel";
import DoctorsPanel from "@/components/admin/DoctorsPanel";
import OrdersPanel from "@/components/admin/OrdersPanel";
import AnalyticsPanel from "@/components/admin/AnalyticsPanel";
import SettingsPanel from "@/components/admin/SettingsPanel";

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<AdminView>("overview");

  const renderPanel = () => {
    switch (activeView) {
      case "overview":
        return <OverviewPanel />;
      case "doctors":
        return <DoctorsPanel />;
      case "orders":
        return <OrdersPanel />;
      case "analytics":
        return <AnalyticsPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        return <OverviewPanel />;
    }
  };

  return <Box sx={{ height: "100%" }}>{renderPanel()}</Box>;
}
