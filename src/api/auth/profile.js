import api from "../axios";

/* ================= GET PROFILE ================= */
export const getProfile = () => {
  return api.get("/api/auth/profile");
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = (data) => {
  return api.put("/api/auth/profile", data);
};
