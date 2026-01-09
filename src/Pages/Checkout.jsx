import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import api from "../api/axios";
import authHeader from "../api/authHeader";

const Checkout = () => {
  const navigate = useNavigate();

  /* ================= CART ================= */
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* ================= TOTAL ================= */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  /* ================= PLACE ORDER ================= */
  const handlePlaceOrder = async () => {
    try {
      // 🔐 Login check
      if (!localStorage.getItem("token")) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      // 🛒 Cart empty check
      if (cartItems.length === 0) {
        alert("Cart is empty");
        return;
      }

      // ✅ ORDER PAYLOAD
      const payload = {
        products: cartItems.map((item) => ({
          product: item._id,   // ✅ MongoDB ObjectId
          quantity: item.qty,
          price: item.price,
        })),
        total: subtotal,
      };

      // 🔥 API CALL
      const res = await api.post("/orders", payload, {
        headers: authHeader(),
      });

      // ✅ SAVE LAST ORDER
      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          orderId: res.data._id,
          items: cartItems,
          total: subtotal,
        })
      );

      // 🧹 Clear cart
      localStorage.removeItem("cart");

      // ➡️ Success page
      navigate("/order-success");

    } catch (err) {
      console.error("ORDER ERROR 👉", err.response?.data || err);
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <Navbar />

      <div className="max-w-5xl mx-auto bg-white rounded-xl p-6 shadow mt-6">
        <h2 className="text-xl font-bold mb-6">Checkout</h2>

        {/* CART ITEMS */}
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between border-b py-3">
            <div>
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-600">
                ₹{item.price} × {item.qty}
              </p>
            </div>
            <span className="font-bold">
              ₹{item.price * item.qty}
            </span>
          </div>
        ))}

        {/* TOTAL */}
        <div className="flex justify-between text-lg font-bold mt-6">
          <span>Total</span>
          <span>₹{subtotal}</span>
        </div>

        {/* PAYMENT */}
        <div className="mt-4 text-sm bg-green-50 border border-green-200
                        text-green-700 p-3 rounded">
          Payment Method: <strong>Cash on Delivery</strong>
        </div>

        {/* BUTTON */}
        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-green-600 hover:bg-green-700
                     text-white py-3 rounded-lg font-semibold"
        >
          Place Order (Cash on Delivery)
        </button>
      </div>
    </div>
  );
};

export default Checkout;
