import { HiOutlineShoppingBag } from "react-icons/hi";

const BASE_URL = "https://internship-backend-osou.onrender.com";

const ProductCard = ({ product }) => {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      (item) => item._id === product._id
    );

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: Number(product.price),
        vendor: product.vendor, // 🔥 VERY IMPORTANT
        image: product.image
          ? `${BASE_URL}${product.image}`
          : "/placeholder.png",
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Product added to cart");
  };

  const imageUrl = product.image
    ? `${BASE_URL}${product.image}`
    : "/placeholder.png";

  return (
    <div className="bg-white rounded-2xl border p-4 flex flex-col hover:border-orange-400 hover:shadow-lg transition">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-3"
      />

      <h3 className="text-sm font-medium mb-1">{product.name}</h3>
      <p className="font-semibold mb-3">₹{product.price}</p>

      <button
        onClick={addToCart}
        className="mt-auto bg-orange-500 hover:bg-orange-600 text-white py-2 rounded flex items-center justify-center gap-2 font-semibold"
      >
        <HiOutlineShoppingBag />
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
