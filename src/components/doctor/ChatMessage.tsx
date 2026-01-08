"use client";

import { Box, Typography, Avatar, Paper } from "@mui/material";
import { Check, DoneAll } from "@mui/icons-material";
import { Message } from "@/types";
import { formatRelativeTime } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isDoctor = message.sender === "doctor";

  const getStatusIcon = () => {
    switch (message.status) {
      case "sending":
        return <Check sx={{ fontSize: 14, color: "grey.400" }} />;
      case "sent":
        return <Check sx={{ fontSize: 14, color: "grey.500" }} />;
      case "delivered":
        return <DoneAll sx={{ fontSize: 14, color: "primary.main" }} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isDoctor ? "flex-end" : "flex-start",
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isDoctor ? "row-reverse" : "row",
          alignItems: "flex-end",
          gap: 1,
          maxWidth: "70%",
        }}
      >
        {!isDoctor && (
          <Avatar
            sx={{
              width: 28,
              height: 28,
              bgcolor: "grey.300",
              fontSize: 12,
            }}
          >
            P
          </Avatar>
        )}

        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: isDoctor ? "primary.main" : "white",
            color: isDoctor ? "white" : "text.primary",
            borderBottomRightRadius: isDoctor ? 4 : 16,
            borderBottomLeftRadius: isDoctor ? 16 : 4,
          }}
        >
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {message.text}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 0.5,
              mt: 0.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: isDoctor ? "rgba(255,255,255,0.7)" : "text.secondary",
                fontSize: 10,
              }}
            >
              {formatRelativeTime(message.timestamp)}
            </Typography>
            {isDoctor && getStatusIcon()}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
