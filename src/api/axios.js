import axios from "axios";

/* 🔥 DEBUG (production me bhi console me dikhega) */
const BASE_URL = import.meta.env.VITE_API_URL;

console.log("VITE_API_URL =", BASE_URL);

/* 🔥 SAFETY FALLBACK */
const api = axios.create({
  baseURL: BASE_URL
    ? `${BASE_URL}/api`
    : "https://internship-backend-osou.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* 🔥 OPTIONAL: response error log (debug ke liye) */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API ERROR:",
      error.response?.status,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default api;
