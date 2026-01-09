import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import authHeader from "../api/authHeader";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

const VendorAddListing = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    type: "cow",
    price: "",
    location: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const submitListing = async () => {
    if (!form.title || !form.price || !form.location) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(form).forEach((key) =>
        formData.append(key, form[key])
      );
      if (image) formData.append("image", image);

      await api.post("/listings", formData, {
        headers: {
          ...authHeader(),
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Listing added successfully");
      navigate("/vendor-dashboard");
    } catch (err) {
      alert("Failed to add listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          Add New Listing
        </h2>

        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <input
            name="title"
            placeholder="Listing Title"
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={handleChange}
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="cow">Cow</option>
            <option value="buffalo">Buffalo</option>
            <option value="goat">Goat</option>
            <option value="sheep">Sheep</option>
          </select>

          <input
            name="price"
            type="number"
            placeholder="Price"
            className="w-full border p-2 rounded"
            value={form.price}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            className="w-full border p-2 rounded"
            value={form.location}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2 rounded"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            onClick={submitListing}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700
                       text-white px-6 py-2 rounded"
          >
            {loading ? "Submitting..." : "Add Listing"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VendorAddListing;
