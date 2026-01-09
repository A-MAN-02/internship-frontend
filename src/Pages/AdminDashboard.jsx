import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import authHeader from "../api/authHeader";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/login");
      return;
    }

    fetchAdminProfile();
    fetchUsers();
  }, [navigate]);

  /* ================= FETCH ADMIN PROFILE ================= */
  const fetchAdminProfile = async () => {
    try {
      const res = await api.get("/auth/profile", {
        headers: authHeader(),
      });
      setAdmin(res.data);
    } catch {
      navigate("/login");
    }
  };

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users", {
        headers: authHeader(),
      });
      setUsers(res.data.users || []);
    } catch {
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE USER ================= */
  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      await api.delete(`/users/${id}`, {
        headers: authHeader(),
      });
      fetchUsers();
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= SEARCH ================= */
  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
        <h1 className="text-xl font-bold text-green-400 mb-8">
          Admin Panel
        </h1>

        <div className="mb-8">
          <p className="text-sm text-slate-300">Logged in as</p>
          <p className="font-semibold text-lg">
            {admin?.name || "Admin"}
          </p>
        </div>

        {/* FUTURE NAV (ready) */}
        <nav className="space-y-2 mb-auto">
          <button className="w-full text-left px-3 py-2 rounded bg-white/10">
            Users
          </button>
          <button
            disabled
            className="w-full text-left px-3 py-2 rounded opacity-40"
          >
            Orders (coming)
          </button>
          <button
            disabled
            className="w-full text-left px-3 py-2 rounded opacity-40"
          >
            Products (coming)
          </button>
          <button
            disabled
            className="w-full text-left px-3 py-2 rounded opacity-40"
          >
            Vendors (coming)
          </button>
        </nav>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="w-full bg-red-500 hover:bg-red-600 py-2 rounded font-semibold"
        >
          Logout
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold">Users</h2>
            <p className="text-slate-500 text-sm">
              Manage all registered users
            </p>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="px-4 py-2 border rounded-lg w-80"
          />
        </div>

        {loading && <p>Loading...</p>}

        {/* ================= USERS TABLE ================= */}
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b bg-slate-50 text-left">
                <th className="py-3 px-4 w-[25%]">Name</th>
                <th className="py-3 px-4 w-[35%]">Email</th>
                <th className="py-3 px-4 w-[20%] text-center">
                  Role
                </th>
                <th className="py-3 px-4 w-[20%] text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr
                  key={u._id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="py-3 px-4 font-medium">
                    {u.name}
                  </td>
                  <td className="py-3 px-4">{u.email}</td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white
                        ${
                          u.role === "admin"
                            ? "bg-slate-800"
                            : u.role === "vendor"
                            ? "bg-purple-600"
                            : "bg-teal-500"
                        }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      disabled={u._id === admin?._id}
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-500 hover:bg-red-600
                                 text-white px-4 py-1 rounded
                                 disabled:opacity-40"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {!loading && filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
