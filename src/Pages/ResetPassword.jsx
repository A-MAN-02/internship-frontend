import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // ✅ ADD (ONLY NEW LINE)

const ResetPassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      return setError("All fields are required");
    }

    if (form.newPassword !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");

    try {
      // 🔥 ONLY FIX (fetch ➜ axios)
      await api.post("/auth/reset-password", {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      alert("Password updated. Please login again.");
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Reset Password</h2>

        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
        />

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
