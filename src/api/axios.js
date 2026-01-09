import axios from "axios";

/*
  🔥 Backend Base URL
  - Local: http://localhost:5000/api
  - Live:  https://internship-backend-osou.onrender.com/api
*/

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://internship-backend-osou.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;
