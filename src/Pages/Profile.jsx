import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import api from "../api/axios"; // 🔥 IMPORTANT
import {
  FaUserEdit,
  FaPhone,
  FaEnvelope,
  FaUserTag,
  FaStore,
} from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  /* ================= AUTH + ROLE GUARD ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
      return;
    }

    // 🔥 ADMIN SHOULD NOT SEE PROFILE PAGE
    if (role === "admin") {
      navigate("/admin");
      return;
    }

    const getProfile = async () => {
      try {
        const res = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        setForm({
          name: res.data.name || "",
          phone: res.data.phone || "",
        });
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    getProfile();
  }, [navigate]);

  /* ================= UPDATE PROFILE ================= */
  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        "/auth/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
      setEditOpen(false);
    } catch (err) {
      console.error(err);
      alert("Profile update failed");
    }
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            My Profile
          </h2>

          {/* AVATAR */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-4xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-4 text-sm">
            <ProfileRow icon={<FaUserEdit />} label="Name" value={user.name} />
            <ProfileRow icon={<FaEnvelope />} label="Email" value={user.email} />
            <ProfileRow icon={<FaPhone />} label="Phone" value={user.phone || "Not added"} />
            <ProfileRow icon={<FaUserTag />} label="Role" value={user.role} />
          </div>

          {/* ACTIONS */}
          <div className="mt-6 space-y-3">
            {user.role === "vendor" && (
              <button
                onClick={() => navigate("/vendor-dashboard")}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
              >
                <FaStore /> Vendor Dashboard
              </button>
            )}

            <button
              onClick={() => setEditOpen(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
            >
              Edit Profile
            </button>

            <button
              onClick={() => navigate("/reset-password")}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
            >
              Reset Password
            </button>

            <button
              onClick={() => navigate("/my-orders")}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
            >
              My Orders
            </button>

            <button
              onClick={logout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* EDIT MODAL */}
        {editOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm">
              <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

              <input
                className="w-full border px-3 py-2 rounded mb-3"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="w-full border px-3 py-2 rounded mb-4"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <div className="flex justify-end gap-3">
                <button onClick={() => setEditOpen(false)}>Cancel</button>
                <button
                  onClick={updateProfile}
                  className="bg-green-500 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Profile;

/* ================= REUSABLE ROW ================= */
const ProfileRow = ({ icon, label, value }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <div className="flex items-center gap-2 text-gray-600">
      {icon}
      <span>{label}</span>
    </div>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);
