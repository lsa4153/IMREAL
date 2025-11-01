import axios from "axios";

// api Client
// 실제 API 엔드포인트로 교체해야 합니다
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.example.com";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Authentication
  auth: {
    me: async () => {
      try {
        return await apiClient.get("/auth/me");
      } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
      }
    },
    login: async (credentials) => {
      return await apiClient.post("/auth/login", credentials);
    },
    logout: async () => {
      localStorage.removeItem("auth_token");
      return { success: true };
    },
  },

  // Deepfake Detection
  detection: {
    analyze: async (imageFile) => {
      const formData = new FormData();
      formData.append("image", imageFile);
      return await apiClient.post("/detection/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    getHistory: async () => {
      return await apiClient.get("/detection/history");
    },
  },

  // Image Protection
  protection: {
    addWatermark: async (imageFile, options) => {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("options", JSON.stringify(options));
      return await apiClient.post("/protection/watermark", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    protect: async (imageFile) => {
      const formData = new FormData();
      formData.append("image", imageFile);
      return await apiClient.post("/protection/protect", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  },

  // News
  news: {
    getLatest: async () => {
      return await apiClient.get("/news/latest");
    },
  },
};
