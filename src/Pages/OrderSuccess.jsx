import { HiCheckCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Common/Navbar";

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);

  /* ================= LOAD LAST ORDER ================= */
  useEffect(() => {
    const storedOrder = localStorage.getItem("lastOrder");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  /* ================= NO ORDER FALLBACK ================= */
  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
          <p className="text-gray-500 text-lg">No order found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 flex justify-center px-4 py-10">
        <div className="w-full max-w-4xl">

          {/* ================= HEADER ================= */}
          <div className="bg-white rounded-2xl shadow p-8 text-center mb-6">
            <HiCheckCircle className="text-green-500 w-20 h-20 mx-auto mb-4" />

            <h1 className="text-3xl font-extrabold text-green-700 mb-2">
              Order Confirmed 🎉
            </h1>

            <p className="text-slate-600">
              Thank you for your purchase. Your order has been placed successfully.
            </p>

            <p className="mt-3 text-sm text-slate-500">
              Order ID:{" "}
              <span className="font-semibold text-slate-800">
                {order._id || order.orderId}
              </span>
            </p>

            <div className="mt-4 inline-block bg-green-50 border border-green-200
                            text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
              Payment Method: Cash on Delivery
            </div>
          </div>

          {/* ================= ITEMS ================= */}
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Purchased Items</h2>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.qty}
                      </p>
                    </div>
                  </div>

                  <p className="font-bold">
                    ₹{(item.price * item.qty).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= SUMMARY ================= */}
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <div className="flex justify-between text-xl font-extrabold">
              <span>Total Amount</span>
              <span>₹{order.total.toLocaleString()}</span>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Order Status: <span className="font-semibold">Pending</span>
            </p>
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/my-orders"
              className="px-6 py-3 rounded-xl bg-blue-600
                         text-white font-semibold hover:bg-blue-700"
            >
              View My Orders
            </Link>

            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-slate-700
                         text-white font-semibold hover:bg-slate-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
