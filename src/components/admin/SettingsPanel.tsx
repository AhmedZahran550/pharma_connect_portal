"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import {
  Notifications,
  Email,
  Security,
  Palette,
  Language,
  Save,
} from "@mui/icons-material";

interface SettingsSection {
  title: string;
  icon: React.ReactNode;
  settings: {
    key: string;
    label: string;
    description: string;
    type: "toggle" | "text";
    value: boolean | string;
  }[];
}

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    title: "Notifications",
    icon: <Notifications />,
    settings: [
      {
        key: "emailNotifications",
        label: "Email Notifications",
        description: "Receive email notifications for new orders",
        type: "toggle",
        value: true,
      },
      {
        key: "pushNotifications",
        label: "Push Notifications",
        description: "Enable browser push notifications",
        type: "toggle",
        value: true,
      },
      {
        key: "smsNotifications",
        label: "SMS Notifications",
        description: "Receive SMS for urgent alerts",
        type: "toggle",
        value: false,
      },
    ],
  },
  {
    title: "Security",
    icon: <Security />,
    settings: [
      {
        key: "twoFactor",
        label: "Two-Factor Authentication",
        description: "Add an extra layer of security",
        type: "toggle",
        value: false,
      },
      {
        key: "sessionTimeout",
        label: "Session Timeout (minutes)",
        description: "Auto-logout after inactivity",
        type: "text",
        value: "30",
      },
    ],
  },
  {
    title: "Appearance",
    icon: <Palette />,
    settings: [
      {
        key: "darkMode",
        label: "Dark Mode",
        description: "Use dark theme across the application",
        type: "toggle",
        value: false,
      },
      {
        key: "compactMode",
        label: "Compact Mode",
        description: "Reduce spacing for more content",
        type: "toggle",
        value: false,
      },
    ],
  },
];

export default function SettingsPanel() {
  const [settings, setSettings] = useState<Record<string, boolean | string>>(
    {}
  );
  const [saved, setSaved] = useState(false);

  const handleToggle = (key: string, currentValue: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !currentValue,
    }));
    setSaved(false);
  };

  const handleTextChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    setSaved(false);
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getValue = (key: string, defaultValue: boolean | string) => {
    return settings[key] !== undefined ? settings[key] : defaultValue;
  };

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
            Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your application preferences
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
          Save Changes
        </Button>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Settings saved successfully!
        </Alert>
      )}

      {SETTINGS_SECTIONS.map((section, index) => (
        <Paper key={section.title} sx={{ mb: 2 }}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "grey.50",
            }}
          >
            {section.icon}
            <Typography variant="subtitle1" fontWeight={600}>
              {section.title}
            </Typography>
          </Box>
          <Divider />
          <List disablePadding>
            {section.settings.map((setting, settingIndex) => (
              <ListItem
                key={setting.key}
                sx={{
                  py: 2,
                  borderBottom:
                    settingIndex < section.settings.length - 1
                      ? "1px solid"
                      : "none",
                  borderColor: "divider",
                }}
              >
                <ListItemText
                  primary={setting.label}
                  secondary={setting.description}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                {setting.type === "toggle" ? (
                  <Switch
                    checked={
                      getValue(setting.key, setting.value as boolean) as boolean
                    }
                    onChange={() =>
                      handleToggle(
                        setting.key,
                        getValue(
                          setting.key,
                          setting.value as boolean
                        ) as boolean
                      )
                    }
                  />
                ) : (
                  <TextField
                    size="small"
                    value={getValue(setting.key, setting.value as string)}
                    onChange={(e) =>
                      handleTextChange(setting.key, e.target.value)
                    }
                    sx={{ width: 100 }}
                  />
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Box>
  );
}
