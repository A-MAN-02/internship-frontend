import { useEffect, useState } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const CartContents = () => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartProducts(cart);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const updateQty = (_id, delta) => {
    const updated = cartProducts.map((item) =>
      item._id === _id
        ? { ...item, qty: Math.max(1, item.qty + delta) }
        : item
    );

    setCartProducts(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (_id) => {
    const updated = cartProducts.filter((i) => i._id !== _id);
    setCartProducts(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (cartProducts.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty</p>;
  }

  return (
    <div>
      {cartProducts.map((product) => (
        <div key={product._id} className="flex gap-4 py-4 border-b">
          <img
            src={product.image}
            className="w-20 h-24 rounded object-cover"
          />

          <div className="flex-1 text-black">
            <h3 className="font-semibold">{product.name}</h3>

            <div className="flex items-center gap-3 mt-2">
              <button onClick={() => updateQty(product._id, -1)} className="px-2 border rounded">−</button>
              <span>{product.qty}</span>
              <button onClick={() => updateQty(product._id, 1)} className="px-2 border rounded">+</button>
            </div>

            <p className="mt-2 font-semibold">
              ₹{(product.price * product.qty).toLocaleString()}
            </p>
          </div>

          <button onClick={() => removeItem(product._id)}>
            <RiDeleteBin3Line className="text-red-500 h-5 w-5" />
          </button>
        </div>
      ))}

      <button
        onClick={() => navigate("/checkout")}
        className="w-full mt-4 bg-black text-white py-3 rounded font-semibold"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartContents;
