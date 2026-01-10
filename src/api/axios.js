import axios from "axios";

const api = axios.create({
  baseURL: "https://internship-backend-osou.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* TOKEN AUTO ATTACH */
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

/* DEBUG */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API ERROR:",
      error.config?.url,
      error.response?.status,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

export default api;
