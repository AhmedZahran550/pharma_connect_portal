"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Paper,
  InputAdornment,
  Chip,
} from "@mui/material";
import { Send, AttachFile, Image, Circle } from "@mui/icons-material";
import { Consultation, ServiceRequest, Message } from "@/types";
import { formatRelativeTime, getInitials } from "@/lib/utils";
import ChatMessage from "./ChatMessage";
import PrescriptionViewer from "./PrescriptionViewer";

interface CommunicationHubProps {
  consultation?: Consultation | null;
  serviceRequest?: ServiceRequest | null;
  activeTab?: "consultations" | "service-requests";
  onSendMessage?: (message: string) => void;
}

export default function CommunicationHub({
  consultation,
  serviceRequest,
  activeTab = "consultations",
  onSendMessage,
}: CommunicationHubProps) {
  const [message, setMessage] = useState("");

  const currentItem =
    activeTab === "consultations" ? consultation : serviceRequest;
  const messages = currentItem?.messages || [];

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage?.(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!currentItem) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          bgcolor: "grey.50",
        }}
      >
        <Typography color="text.secondary">
          Select a{" "}
          {activeTab === "consultations" ? "consultation" : "service request"}{" "}
          to start
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "grey.50",
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>
          {getInitials(currentItem.patientName)}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Circle sx={{ fontSize: 8, color: "success.main" }} />
            <Typography variant="caption" color="text.secondary">
              {currentItem.isTyping ? "Typing..." : "Online"}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Prescription Viewer (for service requests) */}
      {serviceRequest && serviceRequest.prescriptionImages.length > 0 && (
        <PrescriptionViewer images={serviceRequest.prescriptionImages} />
      )}

      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        className="custom-scrollbar"
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography color="text.secondary">
              No messages yet. Start the conversation!
            </Typography>
          </Box>
        ) : (
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        )}
      </Box>

      {/* Input Area */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            sx: { borderRadius: 3, bgcolor: "grey.100" },
            startAdornment: (
              <InputAdornment position="start">
                <IconButton size="small">
                  <AttachFile fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <Image fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  onClick={handleSend}
                  disabled={!message.trim()}
                >
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    </Box>
  );
}
