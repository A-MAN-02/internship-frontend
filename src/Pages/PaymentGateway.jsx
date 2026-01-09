import { useEffect, useState } from "react";
import { HiX, HiChevronRight, HiCreditCard } from "react-icons/hi";
import Navbar from "../components/Common/Navbar";
import { useNavigate } from "react-router-dom";

const PaymentGateway = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("card");

  /* 🛒 LOAD CART WITH QTY */
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  /* 🔄 KEEP CART SYNCED */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* ❌ REMOVE ITEM */
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  /* 🧮 CORRECT SUBTOTAL (WITH QTY) */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 flex justify-center p-6">
        <div className="w-full max-w-6xl">

          {/* HEADER */}
          <div className="flex justify-center items-center gap-3 mb-10">
            <h1 className="text-2xl font-extrabold">Checkout</h1>
            <span className="bg-slate-400 text-white text-xs px-3 py-1 rounded-full font-bold">
              {cartItems.reduce((s, i) => s + i.qty, 0)} ITEMS
            </span>
          </div>

          <div className="bg-white rounded-3xl shadow border flex flex-col lg:flex-row overflow-hidden">

            {/* LEFT — ORDER SUMMARY */}
            <div className="lg:w-[45%] bg-slate-100 p-10 border-r">
              {cartItems.length === 0 && (
                <p className="text-center text-slate-500 font-medium">
                  Your cart is empty
                </p>
              )}

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className="w-20 h-20 bg-white border rounded-xl flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-14" />
                      </div>

                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-xs text-slate-400 font-semibold">
                          x {item.qty}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-20">
                      <span className="font-bold">
                        ₹{(item.price * item.qty).toLocaleString()}
                      </span>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-300 hover:text-red-500"
                      >
                        <HiX className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="mt-10 border-t pt-6 space-y-3">
                <div className="flex justify-between text-slate-500">
                  <span>Sub total</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-extrabold">
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* RIGHT — PAYMENT */}
            <div className="lg:w-[55%] p-10">
              <div className="max-w-md mx-auto">

                <div className="opacity-40 space-y-6 mb-10">
                  {["Contact Information", "Shipping Information", "Billing Information"].map(
                    (step) => (
                      <div key={step} className="flex justify-between items-center border-t pt-6">
                        <span className="font-bold text-lg">{step}</span>
                        <HiChevronRight />
                      </div>
                    )
                  )}
                </div>

                <div className="border-t pt-8">
                  <h2 className="text-xl font-extrabold mb-6">Payment Method</h2>

                  <div
                    onClick={() => setSelectedMethod("card")}
                    className="flex justify-between items-center p-5 rounded-xl cursor-pointer border-2 border-slate-900 bg-white shadow mb-4"
                  >
                    <span className="font-bold">Credit Card</span>
                    <HiCreditCard className="text-xl text-slate-400" />
                  </div>

                  <div className="mt-6 space-y-4">
                    <Input label="Card Number" placeholder="0000 0000 0000 0000" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Expiry Date" placeholder="MM / YY" />
                      <Input label="CVV" type="password" placeholder="000" />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      localStorage.removeItem("cart");
                      window.dispatchEvent(new Event("cartUpdated"));
                      navigate("/order-success");
                    }}
                    disabled={cartItems.length === 0}
                    className={`w-full mt-10 py-5 rounded-2xl font-bold text-lg
                      ${cartItems.length === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-slate-900 text-white active:scale-95"}`}
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentGateway;

/* INPUT */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-bold text-slate-700 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-slate-50 border rounded-xl px-4 py-4 outline-none focus:border-slate-900"
    />
  </div>
);
