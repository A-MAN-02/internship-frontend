import axios from "axios";

/* ================= ENV DEBUG ================= */
const BASE_URL = import.meta.env.VITE_API_URL;
console.log("✅ VITE_API_URL =", BASE_URL);

/* ================= AXIOS INSTANCE ================= */
const api = axios.create({
  baseURL: `${BASE_URL}/api`, // ✅ CORRECT
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

/* ================= RESPONSE ERROR DEBUG ================= */
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
