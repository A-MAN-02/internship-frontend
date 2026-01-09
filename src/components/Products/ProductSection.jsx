import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ProductCard from "./ProductCard";
import api from "../../api/axios"; // ✅ BACKEND CONNECT

const tabs = [
  { key: "all", label: "All Products" },
  { key: "dog", label: "Dog Food" },
  { key: "cat", label: "Cat Food" },
  { key: "accessories", label: "Dog Accessories" },
];

const CARD_WIDTH = 280;
const GAP = 24;
const VISIBLE_CARDS = 4;

const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [index, setIndex] = useState(0);
  const [allProducts, setAllProducts] = useState([]);

  // ✅ FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setAllProducts(res.data || []);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };

    fetchProducts();
  }, []);

  // ✅ FILTER PRODUCTS BASED ON TAB
  const products =
    activeTab === "all"
      ? allProducts
      : allProducts.filter(
          (p) =>
            p.category?.toLowerCase() === activeTab ||
            p.type?.toLowerCase() === activeTab
        );

  const maxIndex = Math.max(0, products.length - VISIBLE_CARDS);

  const next = () =>
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prev = () =>
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  // Reset slider on tab change
  useEffect(() => {
    setIndex(0);
  }, [activeTab]);

  // Auto slide
  useEffect(() => {
    if (products.length <= VISIBLE_CARDS) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [maxIndex, products.length]);

  return (
    <section className="container mx-auto px-4 mt-14 relative">
      {/* TITLE */}
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        Products
      </h2>

      {/* TABS */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition
              ${
                activeTab === tab.key
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:text-black"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* LEFT ARROW */}
      {products.length > VISIBLE_CARDS && (
        <button
          onClick={prev}
          className="absolute left-0 top-[55%] -translate-y-1/2 z-10
                     bg-white rounded-full p-2 shadow hover:bg-gray-100 cursor-pointer"
        >
          <HiChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* SLIDER */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)`,
          }}
        >
          {products.map((product) => (
            <div key={product._id} style={{ minWidth: CARD_WIDTH }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT ARROW */}
      {products.length > VISIBLE_CARDS && (
        <button
          onClick={next}
          className="absolute right-0 top-[55%] -translate-y-1/2 z-10
                     bg-white rounded-full p-2 shadow hover:bg-gray-100 cursor-pointer"
        >
          <HiChevronRight className="h-5 w-5" />
        </button>
      )}
    </section>
  );
};

export default ProductsSection;
