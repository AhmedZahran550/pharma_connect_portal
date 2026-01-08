// import axios from "axios";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// // Auth utility functions
// export const authApi = axios.create({
//   baseURL: `${API_BASE_URL}/auth`,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add auth token to requests
// authApi.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

// // Auth API functions
// export const login = async (email: string, password: string) => {
//   const response = await authApi.post("/login", { email, password });
//   return response.data;
// };

// export const logout = async () => {
//   const response = await authApi.post("/logout");
//   if (typeof window !== "undefined") {
//     localStorage.removeItem("token");
//   }
//   return response.data;
// };

// export const forgotPassword = async (email: string) => {
//   const response = await authApi.post("/forgot-password", { email });
//   return response.data;
// };

// export const resetPassword = async (token: string, password: string) => {
//   const response = await authApi.post("/reset-password", { token, password });
//   return response.data;
// };

// export const verifyEmail = async (token: string) => {
//   const response = await authApi.post("/verify-email", { token });
//   return response.data;
// };

// export const getCurrentUser = async () => {
//   const response = await authApi.get("/me");
//   return response.data;
// };

// export const isAuthenticated = (): boolean => {
//   if (typeof window === "undefined") return false;
//   return !!localStorage.getItem("token");
// };
