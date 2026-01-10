import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

/* ---------------- MAIN DOCTOR PAGE ---------------- */

export default function Doctor() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <InstantDoctor />
      <RelatedProducts />
      <ProductReviews />
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */

function Navbar() {
  return (
    <nav className="w-full bg-teal-700 px-6 py-4 flex items-center justify-between">
      <h2 className="text-white text-xl font-bold">Pet Care</h2>
      <button className="bg-orange-400 text-white px-4 py-2 rounded font-semibold">
        Consultation
      </button>
    </nav>
  );
}

/* ---------------- INSTANT DOCTOR (MAIN FEATURE) ---------------- */

function InstantDoctor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: "",
    time: "",
    phone: "",
    query: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* 🔥 THIS WAS MISSING — NOW FEATURE WORKS */
  const submitAppointment = async () => {
    if (!form.date || !form.time || !form.phone || !form.query) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      // ✅ BACKEND API (we will create backend next)
      await api.post(
        "/doctor/appointment",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Appointment booked successfully ✅");
      setForm({ date: "", time: "", phone: "", query: "" });
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Appointment booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-12">
      
      {/* LEFT */}
      <div>
        <p className="text-teal-700 font-bold">
          BOOK ONLINE VET APPOINTMENT <span className="text-orange-500">₹149/-</span>
        </p>
        <p className="text-sm text-gray-600">
          (Vets Available online from 8 am till 11.30 pm)
        </p>

        <h1 className="text-4xl font-bold mt-6">
          Expert Veterinary Care,<br />Anytime, Anywhere!
        </h1>

        <ul className="mt-8 space-y-4">
          <li>✔ On Demand Availability</li>
          <li>✔ Affordable Consultations</li>
          <li>✔ 100% Pet-Friendly Solutions</li>
        </ul>

        <div className="bg-cyan-100 p-6 rounded-xl mt-8">
          <p>
            Consult With <strong>Certified Veterinarians</strong><br />
            With <strong>25+ Years</strong> of Experience.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="font-bold mb-4">
          Book Online Vet Appointment ₹149/-
        </h3>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 mb-3 bg-white"
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full border p-2 mb-3 bg-white"
        />

        <input
          type="text"
          name="phone"
          placeholder="Mobile Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 mb-3 bg-white"
        />

        <textarea
          name="query"
          placeholder="Describe your pet issue"
          value={form.query}
          onChange={handleChange}
          className="w-full border p-2 h-24 bg-white"
        />

        <button
          onClick={submitAppointment}
          disabled={loading}
          className="w-full bg-orange-400 text-white py-3 rounded-full mt-5 font-bold disabled:opacity-60"
        >
          {loading ? "Booking..." : "Continue"}
        </button>
      </div>
    </section>
  );
}

/* ---------------- RELATED PRODUCTS ---------------- */

function RelatedProducts() {
  const products = [
    {
      id: 1,
      title: "Drools Chicken Puppy Food",
      price: "₹1,800.00",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwAUC1Efm7mAukZN_dkwJJlBd2tcSOXkHtkw&s",
    },
    {
      id: 2,
      title: "Sheba Tuna Cat Food",
      price: "₹1,670.00",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFlE29chsOo4MxGEpYKGFK_ZOj8Ji8Lm_xUg&s",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white shadow rounded p-4">
            <img src={p.img} className="rounded mb-3" />
            <p className="text-sm">{p.title}</p>
            <p className="text-orange-500 font-bold">{p.price}</p>
            <button className="w-full bg-orange-400 text-white py-2 mt-3 rounded">
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PRODUCT REVIEWS ---------------- */

function ProductReviews() {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Aman", rating: 5, text: "Very helpful consultation!" },
  ]);

  const [form, setForm] = useState({
    name: "",
    rating: 0,
    text: "",
  });

  const submitReview = () => {
    if (!form.name || !form.rating || !form.text) return;
    setReviews([{ ...form, id: Date.now() }, ...reviews]);
    setForm({ name: "", rating: 0, text: "" });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {reviews.map((r) => (
        <div key={r.id} className="bg-white shadow p-4 rounded mb-4">
          <strong>{r.name}</strong>
          <div className="text-orange-500">{"★".repeat(r.rating)}</div>
          <p>{r.text}</p>
        </div>
      ))}

      <input
        placeholder="Your Name"
        className="w-full border p-2 mb-3"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <textarea
        placeholder="Your Review"
        className="w-full border p-2 h-28 mb-3"
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      />

      <button
        onClick={submitReview}
        className="bg-orange-500 text-white px-6 py-2 rounded"
      >
        Submit Review
      </button>
    </section>
  );
}
