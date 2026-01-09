import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios"; // ✅ BACKEND CONNECTION

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* =====================================================
     🔐 ALREADY LOGGED-IN GUARD (🔥 MAIN FIX)
     ===================================================== */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "vendor") {
        navigate("/vendor-dashboard", { replace: true });
      } else {
        navigate("/profile", { replace: true });
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.role) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // ✅ BACKEND LOGIN API
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const data = res.data;

      // ✅ STORE TOKEN & ROLE
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      // 🔀 REDIRECT BASED ON ROLE
      if (data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (data.user.role === "vendor") {
        navigate("/vendor-dashboard", { replace: true });
      } else {
        navigate("/profile", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111]">
      {/* LOGIN CARD */}
      <div className="w-[380px] bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-semibold mb-1">
          Log in to your account
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Welcome back 👋
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-4
                         focus:outline-none focus:border-green-500"
            />
            {!form.email && (
              <label className="absolute left-3 top-4 text-gray-900 text-sm pointer-events-none">
                Email Address
              </label>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-4
                         focus:outline-none focus:border-green-500"
            />
            {!form.password && (
              <label className="absolute left-3 top-4 text-gray-900 text-sm pointer-events-none">
                Password
              </label>
            )}
          </div>

          {/* ROLE (UI ONLY) */}
          <div className="relative">
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-4 bg-white
                         focus:outline-none focus:border-green-500"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600
                       text-white py-3 rounded-lg font-semibold
                       transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="flex justify-between text-sm mt-6">
          <Link to="/forgot-password" className="text-green-500 hover:underline">
            Forgot password?
          </Link>
          <Link to="/signup" className="text-green-500 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
