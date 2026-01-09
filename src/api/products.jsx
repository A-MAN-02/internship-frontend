import api from "./axios";
import authHeader from "./authHeader";

export const getVendorProducts = async () => {
  const res = await api.get("/products/vendor", {
    headers: authHeader(),
  });
  return res.data;
};

export const createProduct = async (data) => {
  const res = await api.post("/products", data, {
    headers: authHeader(),
  });
  return res.data;
};
