import axios from "axios";

const api = axios.create({
  baseURL: "https://internship-backend-osou.onrender.com/api",
  withCredentials: true,
});

export default api;
