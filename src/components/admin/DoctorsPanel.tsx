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
    firstName: "Ahmed",
    lastName: "Kamal",
    email: "ahmed.kamal@pharma.com",
    role: "doctor",
    roles: ["PROVIDER_DOCTOR"],
    specialty: "Cardiology",
    status: "online",
  },
  {
    id: "2",
    name: "Dr. Mona Saeed",
    firstName: "Mona",
    lastName: "Saeed",
    email: "mona.saeed@pharma.com",
    role: "doctor",
    roles: ["PROVIDER_DOCTOR"],
    specialty: "Dermatology",
    status: "online",
  },
  {
    id: "3",
    name: "Dr. Khaled Omar",
    firstName: "Khaled",
    lastName: "Omar",
    email: "khaled.omar@pharma.com",
    role: "doctor",
    roles: ["PROVIDER_DOCTOR"],
    specialty: "Pediatrics",
    status: "offline",
  },
  {
    id: "4",
    name: "Dr. Fatma Ibrahim",
    firstName: "Fatma",
    lastName: "Ibrahim",
    email: "fatma.ibrahim@pharma.com",
    role: "doctor",
    roles: ["PROVIDER_DOCTOR"],
    specialty: "General Practice",
    status: "online",
  },
];

export default function DoctorsPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const doctors = MOCK_DOCTORS;

  const filteredDoctors = doctors.filter((doctor) => {
    const fullName = doctor.name || `${doctor.firstName} ${doctor.lastName}`;
    return (
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
            {filteredDoctors.map((doctor) => {
              const fullName =
                doctor.name || `${doctor.firstName} ${doctor.lastName}`;
              return (
                <TableRow key={doctor.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {getInitials(fullName)}
                      </Avatar>
                      <Typography variant="body2" fontWeight={500}>
                        {fullName}
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
