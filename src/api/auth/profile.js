import axios from "../axios";
import authHeader from "../authHeader";

export const getProfile = () => {
  return axios.get("/auth/profile", {
    headers: authHeader(),
  });
};

export const updateProfile = (data) => {
  return axios.put("/auth/profile", data, {
    headers: authHeader(),
  });
};


