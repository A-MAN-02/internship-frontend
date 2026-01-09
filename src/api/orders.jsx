import axios from "./axios";
import authHeader from "./authHeader";

/* USER */
export const getMyOrders = () => {
  return axios.get("/orders/my", {
    headers: authHeader(),
  });
};

/* VENDOR */
export const getVendorOrders = () => {
  return axios.get("/orders/vendor", {
    headers: authHeader(),
  });
};

/* 🔥 RENAME THIS */
export const getVendorEarnings = () => {
  return axios.get("/orders/vendor/summary", {
    headers: authHeader(),
  });
};


export const updateOrderStatus = (orderId, status) => {
  return axios.put(
    `/orders/${orderId}/status`,
    { status },
    { headers: authHeader() }
  );
};
