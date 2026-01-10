import axios from "axios";

/* ================= AXIOS INSTANCE ================= */
const api = axios.create({
  baseURL: "/api", // 🔥 ONLY THIS (vercel.json handle karega)
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= TOKEN AUTO ATTACH ================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE DEBUG ================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "❌ API ERROR:",
      error.config?.url,
      error.response?.status,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default api;
