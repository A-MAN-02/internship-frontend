import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ListingCard from "./ListingCard";
import api from "../../api/axios";

const tabs = [
  { key: "all", label: "All" },
  { key: "cow", label: "Cow" },
  { key: "buffalo", label: "Buffalo" },
  { key: "goat", label: "Goat" },
  { key: "sheep", label: "Sheep" },
];

const CARD_WIDTH = 280;
const GAP = 24;
const VISIBLE_CARDS = 3;

const ListingsSection = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("all");
  const [index, setIndex] = useState(0);

  /* 🔍 FILTER STATES */
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);

  /* ================= FETCH LISTINGS ================= */
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/listings");
        setListings(res.data || []);
      } catch (err) {
        console.error("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredListings = listings.filter((item) => {
    const matchCategory =
      activeTab === "all" || item.type === activeTab;

    const matchSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase());

    const matchPrice = item.price <= maxPrice;

    return matchCategory && matchSearch && matchPrice;
  });

  const maxIndex = Math.max(
    0,
    filteredListings.length - VISIBLE_CARDS
  );

  const next = () =>
    setIndex((p) => (p >= maxIndex ? 0 : p + 1));
  const prev = () =>
    setIndex((p) => (p <= 0 ? maxIndex : p - 1));

  /* RESET SLIDER ON FILTER CHANGE */
  useEffect(() => {
    setIndex(0);
  }, [activeTab, search, maxPrice]);

  /* ================= UI ================= */
  return (
    <section className="container mx-auto px-4 mt-20 relative">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Listings
      </h2>

      {/* ================= FILTER BAR ================= */}
      <div
        className="bg-white p-4 rounded-lg shadow mb-8
                   flex flex-col md:flex-row gap-4"
      >
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by title or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />

        {/* CATEGORY */}
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/4"
        >
          {tabs.map((tab) => (
            <option key={tab.key} value={tab.key}>
              {tab.label}
            </option>
          ))}
        </select>

        {/* PRICE */}
        <div className="flex items-center gap-3 w-full md:w-1/3">
          <span className="text-sm font-semibold">₹0</span>
          <input
            type="range"
            min="0"
            max="100000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm font-semibold">
            ₹{maxPrice}
          </span>
        </div>
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <p className="text-center text-gray-500">
          Loading listings...
        </p>
      )}

      {/* ================= SLIDER ================= */}
      {!loading && filteredListings.length > VISIBLE_CARDS && (
        <button
          onClick={prev}
          className="absolute left-0 top-[65%] z-10
                     bg-white rounded-full p-2 shadow"
        >
          <HiChevronLeft />
        </button>
      )}

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700"
          style={{
            gap: GAP,
            transform: `translateX(-${
              index * (CARD_WIDTH + GAP)
            }px)`,
          }}
        >
          {filteredListings.map((listing) => (
            <div
              key={listing._id}
              style={{ minWidth: CARD_WIDTH }}
            >
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      </div>

      {!loading && filteredListings.length > VISIBLE_CARDS && (
        <button
          onClick={next}
          className="absolute right-0 top-[65%] z-10
                     bg-white rounded-full p-2 shadow"
        >
          <HiChevronRight />
        </button>
      )}

      {/* ================= EMPTY ================= */}
      {!loading && filteredListings.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No listings found
        </p>
      )}
    </section>
  );
};

export default ListingsSection;
