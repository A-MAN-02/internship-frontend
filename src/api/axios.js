import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true, // 🔥 auth / cookies ke liye
  headers: {
    "Content-Type": "application/json",
  },
});

// OPTIONAL: response error log (debug ke liye)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
