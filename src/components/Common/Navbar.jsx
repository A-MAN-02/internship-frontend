import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import CardDrawer from "../Layout/CardDrawer";
import SellModal from "./SellModal";

const Navbar = () => {
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [count, setCount] = useState(0);

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  /* ================= CART COUNT ================= */
  useEffect(() => {
    const update = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCount(cart.reduce((s, i) => s + i.qty, 0));
    };

    update();
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  /* ================= USER ICON ================= */
  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
      return;
    }

    if (role === "admin") navigate("/admin");
    else if (role === "vendor") navigate("/vendor-dashboard");
    else navigate("/profile");
  };

  /* ================= SELL BUTTON ================= */
  const handleSellClick = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
      return;
    }

    if (role === "vendor") {
      navigate("/vendor-dashboard");
    } else {
      setSellOpen(true);
    }
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Listing", path: "/listing" },
    { name: "Doctor", path: "/doctor" },
    { name: "Veterinary", path: "/veterinary" },
  ];

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <div className="bg-[#222] text-white">
        <nav className="container mx-auto flex items-center py-4 px-4 md:px-6">

          {/* LEFT */}
          <div className="flex items-center gap-3 min-w-[150px]">
            <button onClick={toggleNavDrawer} className="md:hidden">
              <HiBars3BottomRight className="h-6 w-6" />
            </button>

            <Link to="/" className="text-xl md:text-2xl font-medium">
              pet-pashu
            </Link>
          </div>

          {/* CENTER */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-10">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-sm font-medium uppercase hover:text-gray-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4 min-w-[180px] justify-end">
            <SearchBar />

            <button
              onClick={handleSellClick}
              className="bg-gradient-to-r from-orange-500 to-orange-400
                         text-white px-3 py-2 rounded-md text-sm font-semibold"
            >
              🐄 SELL
            </button>

            <button onClick={toggleCartDrawer} className="relative">
              <HiOutlineShoppingBag className="h-6 w-6" />
              {count > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500
                                 text-xs px-2 rounded-full">
                  {count}
                </span>
              )}
            </button>

            <button onClick={handleProfileClick}>
              <HiOutlineUser className="h-6 w-6 hover:text-gray-300" />
            </button>
          </div>
        </nav>

        <CardDrawer
          drawerOpen={drawerOpen}
          toggleCartDrawer={toggleCartDrawer}
        />
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg
        transform transition-transform duration-300 z-50
        ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <SellModal sellOpen={sellOpen} setSellOpen={setSellOpen} />
    </>
  );
};

export default Navbar;
