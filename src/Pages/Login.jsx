import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

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
     🔐 ALREADY LOGGED-IN GUARD (FIXED)
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
        // ✅ CUSTOMER FIX
        navigate("/customer-dashboard", { replace: true });
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
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      /* =====================================================
         🔀 ROLE BASED REDIRECT (FIXED)
         ===================================================== */
      if (data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (data.user.role === "vendor") {
        navigate("/vendor-dashboard", { replace: true });
      } else {
        // ✅ CUSTOMER FIX
        navigate("/customer-dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-[#111]">
        <div className="w-[380px] bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold mb-1">
            Log in to your account
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Welcome back 👋
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded-lg px-3 py-4"
            />

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border rounded-lg px-3 py-4"
            />

            {/* ROLE */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-4"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>

            {error && (
              <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-3 rounded-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex justify-between text-sm mt-6">
            <Link to="/forgot-password">Forgot password?</Link>
            <Link to="/signup">Create account</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
