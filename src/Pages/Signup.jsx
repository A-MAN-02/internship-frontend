import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; // ✅ IMPORTANT

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.role
    ) {
      setError("All fields are required");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // ✅ BACKEND CALL (FIXED)
      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role === "customer" ? "user" : formData.role,
      });

      // ✅ Redirect to login on success
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-[#111]">
      {/* CARD */}
      <div className="w-[400px] bg-white rounded-2xl shadow-2xl p-8">
        {/* HEADER */}
        <h2 className="text-2xl font-semibold mb-1">Create Account</h2>
        <p className="text-gray-800 mb-6 text-sm">
          Sign up to start selling or shopping
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <FloatingInput
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <FloatingInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <FloatingInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* PHONE */}
          <FloatingInput
            label="Mobile Number"
            name="phone"
            type="tel"
            maxLength="10"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* ROLE */}
          <div className="relative">
            <select
              name="role"
              value={formData.role}
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

/* ================= REUSABLE FLOATING INPUT ================= */

const FloatingInput = ({ label, value, ...props }) => (
  <div className="relative">
    <input
      {...props}
      value={value}
      placeholder=" "
      className="w-full border rounded-lg px-3 py-4
                 focus:outline-none focus:border-green-200"
    />

    {!value && (
      <label className="absolute left-3 top-4 text-gray-800 text-sm pointer-events-none">
        {label}
      </label>
    )}
  </div>
);
