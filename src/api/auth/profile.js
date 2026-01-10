import api from "../axios";

/* ================= GET PROFILE ================= */
export const getProfile = () => {
  return api.get("/auth/profile");
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = (data) => {
  return api.put("/auth/profile", data);
};
