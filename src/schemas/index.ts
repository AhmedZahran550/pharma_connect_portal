import { z } from "zod";

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// User schema
export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  role: z.enum(["admin", "doctor", "pharmacist", "staff"]),
});

export type UserFormData = z.infer<typeof userSchema>;

// Branch schema
export const branchSchema = z.object({
  name: z.string().min(2, "Branch name is required"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  latitude: z.number(),
  longitude: z.number(),
  isActive: z.boolean().default(true),
});

export type BranchFormData = z.infer<typeof branchSchema>;

// Appointment schema
export const appointmentSchema = z.object({
  patientId: z.string().uuid(),
  doctorId: z.string().uuid(),
  branchId: z.string().uuid(),
  date: z.string(),
  time: z.string(),
  notes: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

// Order schema
export const orderItemSchema = z.object({
  productId: z.string().uuid(),
  name: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0),
});

export const orderSchema = z.object({
  userId: z.string().uuid(),
  branchId: z.string().uuid(),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
});

export type OrderFormData = z.infer<typeof orderSchema>;

// Ticket schema
export const ticketSchema = z.object({
  subject: z.string().min(5, "Subject is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
});

export type TicketFormData = z.infer<typeof ticketSchema>;

// Medical profile schema
export const medicalProfileSchema = z.object({
  bloodType: z.string().optional(),
  allergies: z.array(z.string()).default([]),
  medications: z.array(z.string()).default([]),
  conditions: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

export type MedicalProfileFormData = z.infer<typeof medicalProfileSchema>;

// Password reset schemas
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
