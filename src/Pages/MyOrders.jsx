import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import api from "../api/axios";
import authHeader from "../api/authHeader";

const MyOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      // 🔐 NOT LOGGED IN
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      try {
        console.log("AUTH HEADER 👉", authHeader());

        const res = await api.get("/orders/my", {
          headers: authHeader(),
        });

        setOrders(res.data || []);
      } catch (err) {
        console.error("ORDERS ERROR 👉", err.response || err);

        // 🚨 TOKEN EXPIRED / INVALID
        if (err.response?.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.clear();
          navigate("/login");
        } else {
          alert("Failed to load orders");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-500 text-center">
            Loading orders...
          </p>
        )}

        {/* EMPTY */}
        {!loading && orders.length === 0 && (
          <p className="text-gray-500 text-center">
            No orders found
          </p>
        )}

        {/* ORDERS LIST */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow p-6"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-semibold break-all">
                    {order._id}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "paid"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>

              {/* PRODUCTS */}
              <div className="border-t pt-4 space-y-2 text-sm">
                {order.products.map((item) => (
                  <div
                    key={item.product?._id}
                    className="flex justify-between"
                  >
                    <span>
                      {item.product?.name} × {item.quantity}
                    </span>
                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <p className="text-xs text-gray-500">
                  Ordered on{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <div className="flex items-center gap-4">
                  <p className="font-bold text-lg">
                    ₹{order.total}
                  </p>

                  {/* TRACK ORDER */}
                  <button
                    onClick={() => navigate(`/orders/${order._id}`)}
                    className="bg-blue-500 hover:bg-blue-600
                               text-white px-4 py-1 rounded-md text-sm"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
