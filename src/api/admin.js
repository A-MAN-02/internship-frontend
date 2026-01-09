import api from "./axios";
import authHeader from "./authHeader";

export const getAllUsers = () =>
  api.get("/admin/users", { headers: authHeader() });

export const getAllProducts = () =>
  api.get("/admin/products", { headers: authHeader() });

export const getAllOrders = () =>
  api.get("/admin/orders", { headers: authHeader() });
