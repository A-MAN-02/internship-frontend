import api from "../axios";   // ✅ axios INSTANCE
import authHeader from "../authHeader";

// GET CUSTOMER PROFILE
export const getProfile = () => {
  return api.get("/auth/profile", {
    headers: authHeader(),
  });
};

// UPDATE CUSTOMER PROFILE
export const updateProfile = (data) => {
  return api.put("/auth/profile", data, {
    headers: authHeader(),
  });
};
