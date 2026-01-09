import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import api from "../api/axios";
import authHeader from "../api/authHeader";

const steps = ["pending", "paid", "delivered"];

const TrackOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get("/orders/my", {
          headers: authHeader(),
        });

        const found = res.data.find((o) => o._id === id);
        if (!found) {
          alert("Order not found");
          navigate("/my-orders");
        } else {
          setOrder(found);
        }
      } catch {
        alert("Failed to load order");
      }
    };

    fetchOrder();
  }, [id, navigate]);

  if (!order) return null;

  const currentStep = steps.indexOf(order.status);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Track Order</h2>

        {/* ORDER INFO */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold break-all">{order._id}</p>

          <p className="mt-2 text-sm">
            Ordered on{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* STATUS TIMELINE */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="font-semibold mb-4">Order Status</h3>

          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${
                      index <= currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-sm capitalize">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">Items</h3>

          {order.products.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between border-b py-2 text-sm"
            >
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <div className="flex justify-between font-bold mt-4">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
