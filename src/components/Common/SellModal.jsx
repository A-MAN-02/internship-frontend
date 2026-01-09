import { IoMdClose } from "react-icons/io";

const SellModal = ({ sellOpen, setSellOpen }) => {
  if (!sellOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setSellOpen(false)}
      />

      {/* Modal */}
      <div className="relative bg-[#fff3e8] rounded-xl p-8 w-[90%] max-w-lg z-50">
        
        {/* Close */}
        <button
          onClick={() => setSellOpen(false)}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <IoMdClose className="h-5 w-5 text-gray-700" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-6">
          I want to sell
        </h2>

        {/* Options */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Cattles / Pets */}
          <button className="bg-white border rounded-lg p-6 flex flex-col items-center
                             hover:shadow-md transition cursor-pointer">
            <span className="text-4xl mb-3">🐄</span>
            <span className="font-medium">Cattles / Pets</span>
          </button>

          {/* Products */}
          <button className="bg-white border rounded-lg p-6 flex flex-col items-center
                             hover:shadow-md transition cursor-pointer">
            <span className="text-4xl mb-3">🛍️</span>
            <span className="font-medium">Products</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default SellModal;
