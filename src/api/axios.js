import axios from "axios";

const api = axios.create({
  baseURL: "https://internship-backend-osou.onrender.com",
});

export default api;
