// src/api/authHeader.js

const authHeader = () => {
  const token = localStorage.getItem("token");

  // ❌ Token nahi hai → header mat bhejo
  if (!token) {
    return {};
  }

  // ✅ Backend expects: Authorization: Bearer <token>
  return {
    Authorization: `Bearer ${token}`,
  };
};

export default authHeader;
