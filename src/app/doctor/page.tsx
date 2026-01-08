"use client";

import { useState } from "react";
import { Box, Grid } from "@mui/material";
import CommunicationHub from "@/components/doctor/CommunicationHub";
import PatientContext from "@/components/doctor/PatientContext";
import { Consultation, ServiceRequest } from "@/types";

// Mock data for demo
const MOCK_CONSULTATIONS: Consultation[] = [
  {
    id: "1",
    patientName: "Ahmed Mohamed",
    patientAvatar: "",
    status: "active",
    startTime: new Date(),
    lastMessage: "I have been experiencing headaches...",
    messages: [
      {
        id: "m1",
        sender: "patient",
        text: "Hello Doctor, I have been experiencing headaches for the past week.",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "m2",
        sender: "doctor",
        text: "Hello! I understand. Can you describe the type and location of the headache?",
        timestamp: new Date(Date.now() - 3000000),
      },
    ],
    medicalProfile: {
      id: "mp1",
      userId: "u1",
      bloodType: "A+",
      allergies: ["Penicillin"],
      medications: ["Aspirin"],
      conditions: ["Hypertension"],
      chronicDiseases: ["Diabetes Type 2"],
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

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState<
    "consultations" | "service-requests"
  >("consultations");
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(MOCK_CONSULTATIONS[0]);
  const [selectedServiceRequest, setSelectedServiceRequest] =
    useState<ServiceRequest | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);

  // Get selected item based on active tab
  const selectedItem =
    activeTab === "consultations" ? selectedConsultation : null;

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Communication Hub - Main chat area */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <CommunicationHub
          consultation={selectedConsultation}
          serviceRequest={selectedServiceRequest}
          activeTab={activeTab}
        />
      </Box>

      {/* Patient Context - Right panel */}
      <Box
        sx={{
          width: 360,
          flexShrink: 0,
          display: { xs: "none", lg: "block" },
          overflow: "auto",
        }}
      >
        <PatientContext
          consultation={selectedConsultation}
          serviceRequest={selectedServiceRequest}
        />
      </Box>
    </Box>
  );
}
