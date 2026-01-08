"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Search, Visibility, LocalShipping } from "@mui/icons-material";
import { Order, OrderStatus } from "@/types";
import { formatDate } from "@/lib/utils";

// Mock orders data
const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    userId: "u1",
    branchId: "b1",
    items: [
      { productId: "p1", name: "Aspirin 500mg", quantity: 2, price: 15 },
      { productId: "p2", name: "Vitamin C", quantity: 1, price: 25 },
    ],
    status: "pending",
    total: 55,
    createdAt: "2024-01-15T10:30:00",
  },
  {
    id: "ORD-002",
    userId: "u2",
    branchId: "b1",
    items: [{ productId: "p3", name: "Paracetamol", quantity: 3, price: 12 }],
    status: "processing",
    total: 36,
    createdAt: "2024-01-15T11:45:00",
  },
  {
    id: "ORD-003",
    userId: "u3",
    branchId: "b2",
    items: [{ productId: "p4", name: "Antibiotic", quantity: 1, price: 89 }],
    status: "shipped",
    total: 89,
    createdAt: "2024-01-14T14:20:00",
  },
  {
    id: "ORD-004",
    userId: "u4",
    branchId: "b1",
    items: [{ productId: "p5", name: "Cough Syrup", quantity: 2, price: 22 }],
    status: "delivered",
    total: 44,
    createdAt: "2024-01-13T09:15:00",
  },
];

export default function OrdersPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const orders = MOCK_ORDERS;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Orders Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track and manage all pharmacy orders
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            placeholder="Search by order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            size="small"
            sx={{ flexGrow: 1 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) =>
                setStatusFilter(e.target.value as OrderStatus | "all")
              }
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {order.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {order.items.length} item(s)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {order.items.map((i) => i.name).join(", ")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    ${order.total}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    size="small"
                    color={getStatusColor(order.status)}
                  />
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary">
                    <Visibility fontSize="small" />
                  </IconButton>
                  {order.status === "processing" && (
                    <IconButton size="small" color="success">
                      <LocalShipping fontSize="small" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
