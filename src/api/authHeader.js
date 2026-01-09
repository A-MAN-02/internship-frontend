const authHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`, // 🔥 Capital A + Bearer
  };
};

export default authHeader;
