import { useEffect, useState } from "react";
import Navbar from "../components/Common/Navbar";
import api from "../api/axios";
import authHeader from "../api/authHeader";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalEarnings: 0,
  });

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/vendor", {
        headers: authHeader(),
      });

      const ordersData = res.data || [];
      setOrders(ordersData);

      /* ================= CALCULATE SUMMARY ================= */
      let earnings = 0;

      ordersData.forEach((order) => {
        if (
          order.status === "paid" ||
          order.status === "delivered"
        ) {
          order.products.forEach((p) => {
            earnings += p.price * p.quantity;
          });
        }
      });

      setSummary({
        totalOrders: ordersData.length,
        totalEarnings: earnings,
      });
    } catch (err) {
      alert("Failed to load vendor orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    try {
      await api.put(
        `/orders/${id}/status`,
        { status },
        { headers: authHeader() }
      );
      fetchOrders();
    } catch {
      alert("Failed to update order status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          Vendor Orders
        </h2>

        {/* ================= SUMMARY ================= */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">Total Orders</p>
            <h3 className="text-xl font-bold">
              {summary.totalOrders}
            </h3>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">Total Earnings</p>
            <h3 className="text-xl font-bold">
              ₹{summary.totalEarnings}
            </h3>
          </div>
        </div>

        {/* ================= ORDERS LIST ================= */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow p-6"
            >
              <div className="flex justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>
                  <p className="font-semibold break-all">
                    {order._id}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm capitalize
                    ${
                      order.status === "pending"
                        ? "bg-yellow-200"
                        : order.status === "paid"
                        ? "bg-blue-200"
                        : "bg-green-200"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              {/* PRODUCTS */}
              <div className="border-t pt-4 space-y-2 text-sm">
                {order.products.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between"
                  >
                    <span>
                      {p.product.name} × {p.quantity}
                    </span>
                    <span>
                      ₹{p.price * p.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4">
                {order.status === "pending" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "paid")
                    }
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Mark Paid
                  </button>
                )}

                {order.status === "paid" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "delivered")
                    }
                    className="bg-green-500 text-white px-4 py-1 rounded"
                  >
                    Mark Delivered
                  </button>
                )}
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <p className="text-gray-500 text-center">
              No orders yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorOrders;
