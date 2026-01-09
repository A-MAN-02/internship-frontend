// src/api/authHeader.js

const authHeader = () => {
  const token = localStorage.getItem("token");

  // ❌ No token → no auth header
  if (!token) {
    return {};
  }

  // ✅ Correct Authorization format
  return {
    Authorization: `Bearer ${token}`,
  };
};

export default authHeader;
