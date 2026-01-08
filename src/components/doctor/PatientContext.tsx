"use client";

import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Bloodtype,
  Warning,
  Medication,
  MedicalServices,
  Edit,
  ShoppingCart,
  Assignment,
} from "@mui/icons-material";
import { Consultation, ServiceRequest } from "@/types";
import { getInitials } from "@/lib/utils";

interface PatientContextProps {
  consultation?: Consultation | null;
  serviceRequest?: ServiceRequest | null;
  onCreatePrescription?: () => void;
  onCreateOrder?: () => void;
}

export default function PatientContext({
  consultation,
  serviceRequest,
  onCreatePrescription,
  onCreateOrder,
}: PatientContextProps) {
  const currentItem = consultation || serviceRequest;
  const medicalProfile = currentItem?.medicalProfile;

  if (!currentItem) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          p: 3,
        }}
      >
        <Typography color="text.secondary" textAlign="center">
          Select a patient to view their profile
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "auto",
        bgcolor: "background.paper",
      }}
      className="custom-scrollbar"
    >
      {/* Patient Header */}
      <Paper
        elevation={0}
        sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "primary.main",
              fontSize: 20,
            }}
          >
            {getInitials(currentItem.patientName)}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {currentItem.patientName}
            </Typography>
            <Chip
              label={currentItem.status}
              size="small"
              color={
                currentItem.status === "active"
                  ? "success"
                  : currentItem.status === "pending"
                    ? "warning"
                    : "default"
              }
            />
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<Assignment />}
            onClick={onCreatePrescription}
            sx={{ flex: 1 }}
          >
            Prescription
          </Button>
          <Button
            variant="outlined"
            startIcon={<ShoppingCart />}
            onClick={onCreateOrder}
            sx={{ flex: 1 }}
          >
            Order
          </Button>
        </Box>
      </Paper>

      {/* Medical Profile */}
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
          Medical Profile
        </Typography>

        {/* Blood Type */}
        {medicalProfile?.bloodType && (
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 2,
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
                bgcolor: "error.light",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bloodtype sx={{ color: "error.main" }} />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Blood Type
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {medicalProfile.bloodType}
              </Typography>
            </Box>
          </Paper>
        )}

        {/* Allergies */}
        {medicalProfile?.allergies && medicalProfile.allergies.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Warning sx={{ color: "warning.main", fontSize: 20 }} />
              <Typography variant="body2" fontWeight={600}>
                Allergies
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {medicalProfile.allergies.map((allergy, index) => (
                <Chip
                  key={index}
                  label={allergy}
                  size="small"
                  color="warning"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Current Medications */}
        {medicalProfile?.medications &&
          medicalProfile.medications.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Medication sx={{ color: "info.main", fontSize: 20 }} />
                <Typography variant="body2" fontWeight={600}>
                  Current Medications
                </Typography>
              </Box>
              <List dense disablePadding>
                {medicalProfile.medications.map((med, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                    <ListItemText
                      primary={med}
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

        {/* Chronic Conditions */}
        {medicalProfile?.chronicDiseases &&
          medicalProfile.chronicDiseases.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <MedicalServices sx={{ color: "error.main", fontSize: 20 }} />
                <Typography variant="body2" fontWeight={600}>
                  Chronic Conditions
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {medicalProfile.chronicDiseases.map((disease, index) => (
                  <Chip
                    key={index}
                    label={disease}
                    size="small"
                    color="error"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}

        {/* Diagnosis (for consultations) */}
        {consultation?.diagnosis && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body2" fontWeight={600}>
                  Diagnosis
                </Typography>
                <Button size="small" startIcon={<Edit sx={{ fontSize: 14 }} />}>
                  Edit
                </Button>
              </Box>
              <Paper variant="outlined" sx={{ p: 1.5 }}>
                <Typography variant="body2">
                  {consultation.diagnosis}
                </Typography>
              </Paper>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
