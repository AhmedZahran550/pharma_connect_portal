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
  Avatar,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search, Edit, Delete, Add, Circle } from "@mui/icons-material";
import { User } from "@/types";
import { getInitials } from "@/lib/utils";

// Mock doctors data
const MOCK_DOCTORS: (User & {
  specialty: string;
  status: "online" | "offline";
})[] = [
  {
    id: "1",
    name: "Dr. Ahmed Kamal",
    email: "ahmed.kamal@pharma.com",
    role: "doctor",
    specialty: "Cardiology",
    status: "online",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Dr. Mona Saeed",
    email: "mona.saeed@pharma.com",
    role: "doctor",
    specialty: "Dermatology",
    status: "online",
    createdAt: "2024-02-20",
    updatedAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Dr. Khaled Omar",
    email: "khaled.omar@pharma.com",
    role: "doctor",
    specialty: "Pediatrics",
    status: "offline",
    createdAt: "2024-03-10",
    updatedAt: "2024-03-10",
  },
  {
    id: "4",
    name: "Dr. Fatma Ibrahim",
    email: "fatma.ibrahim@pharma.com",
    role: "doctor",
    specialty: "General Practice",
    status: "online",
    createdAt: "2024-04-05",
    updatedAt: "2024-04-05",
  },
];

export default function DoctorsPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const doctors = MOCK_DOCTORS;

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Doctors Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your medical staff and their availability
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Add Doctor
        </Button>
      </Box>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search doctors by name, email, or specialty..."
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
        />
      </Paper>

      {/* Doctors Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Doctor</TableCell>
              <TableCell>Specialty</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {getInitials(doctor.name)}
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>
                      {doctor.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>
                  <Chip
                    icon={
                      <Circle
                        sx={{
                          fontSize: 10,
                          color:
                            doctor.status === "online"
                              ? "success.main"
                              : "grey.500",
                        }}
                      />
                    }
                    label={doctor.status}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
