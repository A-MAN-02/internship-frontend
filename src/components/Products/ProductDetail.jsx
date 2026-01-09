import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { PRODUCTS } from "../../data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find(p => p.id === Number(id));
  if (!product) return <p className="p-10">Product not found</p>;

  /* STATE */
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("1 kg");
  const [showSticky, setShowSticky] = useState(false);

  /* STICKY BUY BAR */
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ADD TO CART */
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(i => i.id === product.id);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...product, qty, size });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated")); // 🔔 navbar badge
    alert("Added to cart");
  };

  /* BUY NOW */
  const buyNow = () => {
    localStorage.setItem(
      "cart",
      JSON.stringify([{ ...product, qty, size }])
    );
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-6 text-sm text-gray-500 mt-6">
        Home / Dogs / Dog Food / <span className="font-medium text-black">Dry Food</span>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 mt-6 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="border rounded-xl p-4 relative">
          <img
            src={product.image}
            className="w-full h-[420px] object-contain hover:scale-110 transition duration-300"
            alt={product.name}
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="line-through text-gray-400">₹2,000.00</span>
            <span className="text-3xl font-bold text-orange-500">
              ₹{product.price.toLocaleString()}
            </span>
          </div>

          {/* SIZE */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="border px-4 py-2 rounded w-40"
            >
              <option>1 kg</option>
              <option>3 kg</option>
              <option>5 kg</option>
            </select>
            <button
              onClick={() => setSize("1 kg")}
              className="ml-4 text-sm text-gray-500"
            >
              ✕ Clear
            </button>
          </div>

          {/* QTY + ADD */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex border rounded">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-4 py-2"
              >−</button>
              <span className="px-6 py-2">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="px-4 py-2"
              >+</button>
            </div>

            <button
              onClick={addToCart}
              className="bg-orange-500 text-white px-10 py-3 rounded font-semibold"
            >
              ADD TO CART
            </button>
          </div>

          {/* OFFER */}
          <div className="bg-orange-50 p-5 rounded-xl mb-6">
            <h3 className="font-bold mb-2">
              Get 20% Off for your first purchase
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Hurry and get discounts of 20% on all PetPashu Products
            </p>
            <span className="inline-block border border-orange-500 text-orange-500 px-4 py-2 rounded">
              WELCOME20
            </span>
          </div>

          {/* WISHLIST */}
          <div className="flex items-center justify-between border-t pt-4">
            <button className="flex items-center gap-2 text-sm">
              <HiOutlineHeart /> Add to wishlist
            </button>
            <span className="text-sm text-gray-500">
              Share: Facebook | X | LinkedIn
            </span>
          </div>
        </div>
      </div>

      {/* DESCRIPTION & REVIEWS */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <h2 className="text-xl font-bold mb-4">Description</h2>
        <p className="text-gray-600 mb-10">{product.description}</p>

        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <p className="text-gray-500">There are no reviews yet.</p>
      </div>

      {/* STICKY BUY BAR */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <span className="font-bold text-lg">
              ₹{product.price.toLocaleString()}
            </span>
            <div className="flex gap-3">
              <button
                onClick={addToCart}
                className="bg-orange-500 text-white px-6 py-2 rounded"
              >
                Add to Cart
              </button>
              <button
                onClick={buyNow}
                className="bg-green-500 text-white px-6 py-2 rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductDetail;
