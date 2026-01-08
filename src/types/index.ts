// Common type definitions for the application

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  specialty?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "admin" | "doctor" | "pharmacist" | "staff";

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  branchId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
}

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface Order {
  id: string;
  userId: string;
  branchId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
}

export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface MedicalProfile {
  id: string;
  userId: string;
  bloodType?: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  chronicDiseases?: string[];
  currentMedications?: string[];
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

export type NotificationType = "info" | "success" | "warning" | "error";

// ============================================
// Doctor Dashboard Types
// ============================================

export interface Message {
  id: string;
  sender: "patient" | "doctor";
  text: string;
  timestamp: Date | string;
  status?: "sending" | "sent" | "delivered";
}

export interface Consultation {
  id: string;
  patientName: string;
  patientAvatar: string;
  status: ConsultationStatus;
  startTime: Date | string;
  lastMessage: string;
  messages: Message[];
  medicalProfile: MedicalProfile;
  diagnosis?: string;
  isTyping?: boolean;
}

export type ConsultationStatus = "pending" | "active" | "completed";

export interface ServiceRequest {
  id: string;
  patientName: string;
  patientAvatar: string;
  status: ServiceRequestStatus;
  uploadTime: Date | string;
  prescriptionImages: string[];
  medicalProfile: MedicalProfile;
  messages: Message[];
  isTyping?: boolean;
}

export type ServiceRequestStatus = "pending" | "accepted" | "completed";

export interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
  dosage?: string;
  instructions?: string;
}

export interface PrescriptionItem {
  medicineId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

// ============================================
// Admin Dashboard Types
// ============================================

export type AdminView =
  | "overview"
  | "doctors"
  | "orders"
  | "analytics"
  | "settings";

export interface DashboardStats {
  totalDoctors: number;
  totalPatients: number;
  totalOrders: number;
  revenue: number;
  activeConsultations: number;
  pendingRequests: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  errorCode?: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// ============================================
// Auth Types
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token?: string;
}

export interface StoredUser {
  user: User;
  access_token: string;
  refresh_token?: string;
}
