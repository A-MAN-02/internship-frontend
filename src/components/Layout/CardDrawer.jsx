import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CartContents from "../Cart/CartContents";

const CardDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate("/checkout");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg
      transform transition-transform duration-300 z-50
      ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* CLOSE */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* CART */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-semibold mb-4 text-black">Shopping Cart</h2>
        <CartContents />
      </div>
    </div>
  );
};

export default CardDrawer;
