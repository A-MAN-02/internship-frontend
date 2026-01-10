import api from "../axios";
import authHeader from "../authHeader";

export const getProfile = () => {
  return api.get("/auth/profile", {
    headers: authHeader(),
  });
};

export const updateProfile = (data) => {
  return api.put("/auth/profile", data, {
    headers: authHeader(),
  });
};
