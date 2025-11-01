import axios from "axios";

// Django Backend API Client
// 현재: Mock 모드 (FE Only)
// 나중에: 실제 Django 백엔드 연결 시 USE_MOCK_API를 false로 변경

const USE_MOCK_API = true; // ← 나중에 false로 변경하면 실제 API 사용

// Django API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Token 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Token ${token}`; // Django Token 인증
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - 에러 처리
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      // 로그인 페이지로 리다이렉트 (필요시)
    }
    return Promise.reject(error);
  }
);

// =============================================================================
// Mock API (FE Only - 백엔드 없이 테스트용)
// =============================================================================

const mockDelay = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const mockAPI = {
  // 사용자 인증
  users: {
    register: async (data) => {
      await mockDelay(800);
      const user = {
        user_id: Date.now(),
        email: data.email,
        nickname: data.nickname,
        created_at: new Date().toISOString(),
        is_active: true,
      };
      const token = `mock_token_${Date.now()}`;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { message: "회원가입이 완료되었습니다.", user, token };
    },

    login: async (data) => {
      await mockDelay(800);
      const user = {
        user_id: 1,
        email: data.email,
        nickname: "테스트유저",
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        is_active: true,
      };
      const token = `mock_token_${Date.now()}`;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { message: "로그인 성공", user, token };
    },

    logout: async () => {
      await mockDelay(300);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      return { message: "로그아웃 되었습니다." };
    },

    getProfile: async () => {
      await mockDelay(500);
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user) throw new Error("로그인이 필요합니다.");
      return user;
    },
  },

  // 딥페이크 탐지
  detection: {
    analyzeImage: async (formData) => {
      await mockDelay(1500);
      const isFake = Math.random() > 0.5;
      const confidence = Math.floor(Math.random() * 40) + (isFake ? 60 : 20);

      const record = {
        record_id: Date.now(),
        analysis_type: "image",
        analysis_type_display: "이미지",
        file_name: formData.get("image")?.name || "test.jpg",
        file_size: formData.get("image")?.size || 0,
        file_format: "jpg",
        analysis_result: isFake ? "deepfake" : "safe",
        analysis_result_display: isFake ? "딥페이크" : "안전",
        confidence_score: confidence,
        processing_time: 1500,
        ai_model_version: "v1.0",
        created_at: new Date().toISOString(),
        face_detections: [
          {
            detection_id: 1,
            face_count: 1,
            face_coordinates: [{ x: 100, y: 100, width: 200, height: 200 }],
            face_quality_scores: [{ face_id: 1, quality: 0.95 }],
          },
        ],
      };

      // localStorage에 기록 저장
      const history = JSON.parse(
        localStorage.getItem("detection_history") || "[]"
      );
      history.unshift(record);
      localStorage.setItem("detection_history", JSON.stringify(history));

      return record;
    },

    getRecords: async () => {
      await mockDelay(500);
      return JSON.parse(localStorage.getItem("detection_history") || "[]");
    },

    getStatistics: async () => {
      await mockDelay(500);
      const records = JSON.parse(
        localStorage.getItem("detection_history") || "[]"
      );
      const total = records.length;
      const safe = records.filter((r) => r.analysis_result === "safe").length;
      const deepfake = records.filter(
        (r) => r.analysis_result === "deepfake"
      ).length;
      const suspicious = records.filter(
        (r) => r.analysis_result === "suspicious"
      ).length;

      return {
        total_analyses: total,
        safe_count: safe,
        suspicious_count: suspicious,
        deepfake_count: deepfake,
        recent_analyses: records.slice(0, 5),
      };
    },
  },

  // 콘텐츠 보호
  protection: {
    protectImage: async (formData) => {
      await mockDelay(2000);
      return {
        job_id: Date.now(),
        job_type: "adversarial_noise",
        job_status: "completed",
        progress_percentage: 100,
        protected_files: [
          {
            file_name: "protected_" + formData.get("image")?.name,
            file_url: URL.createObjectURL(formData.get("image")),
          },
        ],
      };
    },

    addWatermark: async (formData) => {
      await mockDelay(2000);
      return {
        job_id: Date.now(),
        job_type: "watermark",
        job_status: "completed",
        progress_percentage: 100,
        watermark_text: formData.get("watermark_text"),
        protected_files: [
          {
            file_name: "watermarked_" + formData.get("image")?.name,
            file_url: URL.createObjectURL(formData.get("image")),
          },
        ],
      };
    },
  },

  // 뉴스
  news: {
    getLatest: async () => {
      await mockDelay(800);
      return [
        {
          id: 1,
          title: "딥페이크 기술, 2025년 급속 발전 예상",
          summary:
            "AI 기술의 발전으로 딥페이크 탐지가 더욱 중요해지고 있습니다. 전문가들은 새로운 보안 기술의 필요성을 강조하고 있습니다.",
          date: "2025.01.15",
          category: "기술",
        },
        {
          id: 2,
          title: "정부, 딥페이크 범죄 강력 대응 방침",
          summary:
            "최근 딥페이크를 이용한 범죄가 증가함에 따라 정부가 강력한 처벌 규정을 마련하고 있습니다.",
          date: "2025.01.12",
          category: "사회",
        },
        {
          id: 3,
          title: "AI 기반 딥페이크 탐지 기술 개발",
          summary:
            "국내 연구팀이 99% 정확도의 딥페이크 탐지 알고리즘을 개발해 주목받고 있습니다.",
          date: "2025.01.10",
          category: "과학",
        },
      ];
    },
  },
};

// =============================================================================
// 실제 Django API (나중에 백엔드 연결 시 사용)
// =============================================================================

const realAPI = {
  // 사용자 인증
  users: {
    register: (data) => apiClient.post("/api/users/register/", data),
    login: (data) => apiClient.post("/api/users/login/", data),
    logout: () => apiClient.post("/api/users/logout/"),
    getProfile: () => apiClient.get("/api/users/profile/"),
    updateProfile: (data) => apiClient.put("/api/users/profile/", data),
    getPermissions: () => apiClient.get("/api/users/permissions/"),
    updatePermissions: (data) => apiClient.put("/api/users/permissions/", data),
    getSettings: () => apiClient.get("/api/users/settings/"),
    updateSettings: (data) => apiClient.put("/api/users/settings/", data),
  },

  // 딥페이크 탐지
  detection: {
    analyzeImage: (formData) =>
      apiClient.post("/api/detection/image/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    analyzeVideo: (formData) =>
      apiClient.post("/api/detection/video/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    getRecords: (params) =>
      apiClient.get("/api/detection/records/", { params }),
    getRecord: (id) => apiClient.get(`/api/detection/records/${id}/`),
    deleteRecord: (id) => apiClient.delete(`/api/detection/records/${id}/`),
    getStatistics: () => apiClient.get("/api/detection/statistics/"),
    checkHealth: () => apiClient.get("/api/detection/health/"),
  },

  // 콘텐츠 보호
  protection: {
    protectImage: (formData) =>
      apiClient.post("/api/protection/jobs/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    addWatermark: (formData) =>
      apiClient.post("/api/protection/jobs/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    getJobs: () => apiClient.get("/api/protection/jobs/"),
  },

  // 신고
  reports: {
    create: (data) => apiClient.post("/api/reports/", data),
    getReports: () => apiClient.get("/api/reports/"),
  },

  // Zoom
  zoom: {
    startSession: (data) => apiClient.post("/api/zoom/sessions/", data),
    getSessions: () => apiClient.get("/api/zoom/sessions/"),
  },

  // 뉴스 (실제로는 별도 뉴스 API 사용)
  news: {
    getLatest: () =>
      Promise.resolve([
        {
          id: 1,
          title: "딥페이크 기술, 2025년 급속 발전 예상",
          summary:
            "AI 기술의 발전으로 딥페이크 탐지가 더욱 중요해지고 있습니다.",
          date: "2025.01.15",
          category: "기술",
        },
      ]),
  },
};

// =============================================================================
// Export API (USE_MOCK_API 플래그로 전환)
// =============================================================================

export const api = USE_MOCK_API ? mockAPI : realAPI;

// 백엔드 연결 시:
// 1. .env 파일에서 VITE_API_URL=http://127.0.0.1:8000 설정
// 2. 이 파일에서 USE_MOCK_API = false로 변경
// 3. 끝! 모든 API 호출이 실제 백엔드로 전환됨
