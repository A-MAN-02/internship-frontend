import { useParams, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import listings from "../../data/listings";
import Navbar from "../Common/Navbar";

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const listing = listings.find((l) => l.id === Number(id));
  if (!listing) return <p className="p-10">Listing not found</p>;

  /* 📞 WHATSAPP */
  const openWhatsApp = () => {
    const msg = `Hello ${listing.seller.name}, I am interested in your listing: ${listing.title}`;
    window.open(
      `https://wa.me/${listing.seller.phone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  /* 💳 BOOK NOW → CHECKOUT */
  const bookNow = () => {
    const booking = {
      id: listing.id,
      name: listing.title,
      price: listing.price,
      qty: 1,
      image: listing.image,
      type: "listing",
    };

    localStorage.setItem("checkout", JSON.stringify([booking]));
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full rounded-xl shadow"
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>

          <p className="text-2xl font-semibold text-orange-600 mb-4">
            ₹{listing.price.toLocaleString()}
          </p>

          <p className="text-gray-600 mb-6">{listing.description}</p>

          {/* INFO */}
          <ul className="space-y-2 mb-6 text-gray-700">
            <li><strong>Location:</strong> {listing.location}</li>
            <li><strong>Age:</strong> {listing.age} years</li>
            <li><strong>Gender:</strong> {listing.gender}</li>
            {listing.lactation && <li><strong>Lactation:</strong> Yes</li>}
          </ul>

          {/* ACTIONS */}
          <div className="flex gap-4">
            <button
              onClick={bookNow}
              className="px-6 py-3 bg-green-600 text-white rounded font-semibold hover:bg-green-700"
            >
              Book Now
            </button>

            <button
              onClick={openWhatsApp}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded font-semibold hover:bg-green-600"
            >
              <FaWhatsapp size={20} /> WhatsApp Seller
            </button>
          </div>
        </div>
      </div>

      {/* 🧾 SELLER PROFILE */}
      <div className="max-w-7xl mx-auto p-6 mt-10 bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Seller Profile</h2>

        <div className="grid md:grid-cols-3 gap-4 text-gray-700">
          <p><strong>Name:</strong> {listing.seller.name}</p>
          <p><strong>Location:</strong> {listing.seller.location}</p>
          <p><strong>Experience:</strong> {listing.seller.experience}</p>
        </div>
      </div>
    </>
  );
};

export default ListingDetail;
