import { useState } from "react";
import api from "../api/axios";
import authHeader from "../api/authHeader";

const CreateProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createProduct = async () => {
    if (!form.name || !form.price || !form.stock) {
      alert("Name, price and stock are required");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/products",
        {
          name: form.name,
          price: Number(form.price),
          stock: Number(form.stock),
          description: form.description,
        },
        {
          headers: authHeader(),
        }
      );

      alert("Product added successfully ✅");

      // reset form
      setForm({
        name: "",
        price: "",
        stock: "",
        description: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <input
        name="name"
        placeholder="Product name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={createProduct}
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded disabled:opacity-60"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
};

export default CreateProduct;
