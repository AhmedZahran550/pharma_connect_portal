"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LocalHospital,
  Email,
  Lock,
} from "@mui/icons-material";
import { useAppForm } from "@/hooks/useAppForm";
import { loginSchema, LoginFormData } from "@/schemas/loginSchema";
import { useLogin } from "@/hooks/useAuth";
import ClientWrapper from "../ClientWrapper";

// Demo users for quick login
const DEMO_USERS = [
  {
    email: "doctor@pharma.com",
    password: "doctor123",
    label: "Doctor Demo",
    role: "doctor" as const,
  },
  {
    email: "admin@pharma.com",
    password: "admin123",
    label: "Admin Demo",
    role: "admin" as const,
  },
];

// Inner component that uses hooks requiring QueryClient
function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useAppForm<LoginFormData>({
    schema: loginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginMutation.mutateAsync(data);

      // Redirect based on user role
      if (result.user.role === "doctor") {
        router.push("/doctor");
      } else if (result.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/home");
      }
    } catch {
      // Error is handled by the mutation
    }
  };

  const handleDemoLogin = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
    onSubmit({ email, password });
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 420,
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Logo and Title */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              mb: 2,
            }}
          >
            <LocalHospital sx={{ fontSize: 32, color: "white" }} />
          </Box>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Pharma Connect
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your account
          </Typography>
        </Box>

        {/* Error Alert */}
        {loginMutation.isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {loginMutation.error?.message || "Login failed. Please try again."}
          </Alert>
        )}

        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loginMutation.isPending}
            sx={{
              py: 1.5,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)",
              },
            }}
          >
            {loginMutation.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>

        {/* Demo Login Section */}
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Quick Demo
          </Typography>
        </Divider>

        <Stack direction="row" spacing={2}>
          {DEMO_USERS.map((user) => (
            <Button
              key={user.email}
              fullWidth
              variant="outlined"
              onClick={() => handleDemoLogin(user.email, user.password)}
              disabled={loginMutation.isPending}
              sx={{
                py: 1,
                borderColor: user.role === "doctor" ? "#667eea" : "#764ba2",
                color: user.role === "doctor" ? "#667eea" : "#764ba2",
                "&:hover": {
                  borderColor: user.role === "doctor" ? "#5a6fd6" : "#6a4190",
                  backgroundColor:
                    user.role === "doctor"
                      ? "rgba(102,126,234,0.08)"
                      : "rgba(118,75,162,0.08)",
                },
              }}
            >
              {user.label}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

// Main page component - ClientWrapper is at the top, before any hooks are called
export default function LoginPage() {
  return (
    <ClientWrapper>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          py: 4,
        }}
      >
        <LoginForm />
      </Box>
    </ClientWrapper>
  );
}
