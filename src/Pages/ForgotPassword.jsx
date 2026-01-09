import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessage("Password reset link sent to your email 📧");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] px-4">
      <div className="w-[360px] bg-white rounded-2xl shadow-2xl p-8 text-center">

        {/* HEADER */}
        <h2 className="text-xl font-semibold mb-1">Forgot Password</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your registered email to reset password
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer w-full border rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:border-green-500"
            />
            <label
              className={`absolute left-3 transition-all bg-white px-1
                ${
                  email
                    ? "top-[-8px] text-xs text-green-500"
                    : "top-4 text-gray-400"
                }
                peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-green-500`}
            >
              Email address
            </label>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {message && (
            <div className="bg-green-100 text-green-800 text-sm px-3 py-2 rounded-lg">
              {message}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-sm">
          Back to{" "}
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

export default ForgotPassword;
