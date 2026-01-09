import { HiCheckCircle, HiLocationMarker } from "react-icons/hi";
import { FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://internship-backend-osou.onrender.com";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/listing/${listing._id}`);
  };

  // ✅ FIXED IMAGE URL
  const imageUrl = listing.image
    ? `${BASE_URL}${listing.image}`
    : "/placeholder.png";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-3 w-[280px]">

      {/* IMAGE */}
      <div className="relative rounded-lg overflow-hidden mb-3">
        <img
          src={imageUrl}
          alt={listing.title}
          className="w-full h-44 object-cover"
        />

        {/* VERIFIED */}
        {listing.verified && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <HiCheckCircle /> Verified Listing
          </span>
        )}

        {/* LACTATION */}
        {listing.lactation && (
          <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
            In Lactation
          </span>
        )}
      </div>

      {/* TITLE */}
      <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>

      {/* LOCATION */}
      <p className="flex items-center gap-1 text-sm text-gray-500 mb-1">
        <HiLocationMarker /> {listing.location}
      </p>

      {/* TIME */}
      <p className="flex items-center gap-1 text-sm text-gray-500 mb-2">
        <FiCalendar /> {listing.createdAt?.slice(0, 10)}
      </p>

      {/* DETAILS */}
      <div className="flex justify-between text-sm mb-2">
        <span>{listing.age} Years</span>
        <span>{listing.gender}</span>
      </div>

      {/* PRICE */}
      <p className="text-xl font-bold mb-3">₹{listing.price}</p>

      {/* BUTTON */}
      <button
        onClick={handleViewDetails}
        className="w-full border rounded-md py-2 text-sm font-medium
                   hover:bg-gray-100 transition"
      >
        Buy / Book Now
      </button>
    </div>
  );
};

export default ListingCard;
