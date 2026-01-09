import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import authHeader from "../api/authHeader";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

const VendorDashboard = () => {
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [vendor, setVendor] = useState(null);

  const [products, setProducts] = useState([]);
  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(true);

  /* PRODUCT FORM */
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  /* LISTING FORM */
  const [listingForm, setListingForm] = useState({
    title: "",
    type: "cow",
    price: "",
    age: "",
    location: "",
    description: "",
  });
  const [listingImage, setListingImage] = useState(null);
  const [editListing, setEditListing] = useState(null);

  /* ================= AUTH ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "vendor") {
      navigate("/login");
      return;
    }

    fetchVendor();
    fetchProducts();
    fetchListings();
  }, []);

  const fetchVendor = async () => {
    const res = await api.get("/auth/profile", {
      headers: authHeader(),
    });
    setVendor(res.data);
  };

  const fetchProducts = async () => {
    const res = await api.get("/products/vendor", {
      headers: authHeader(),
    });
    setProducts(res.data || []);
    setLoading(false);
  };

  const fetchListings = async () => {
    const res = await api.get("/listings/vendor", {
      headers: authHeader(),
    });
    setListings(res.data || []);
  };

  /* ================= PRODUCT ================= */
  const addProduct = async () => {
    const fd = new FormData();
    Object.entries(productForm).forEach(([k, v]) => fd.append(k, v));
    if (productImage) fd.append("image", productImage);

    await api.post("/products", fd, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    });

    setProductForm({ name: "", price: "", stock: "", description: "" });
    setProductImage(null);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await api.delete(`/products/${id}`, { headers: authHeader() });
    fetchProducts();
  };

  const updateProduct = async () => {
    await api.put(`/products/${editProduct._id}`, editProduct, {
      headers: authHeader(),
    });
    setEditProduct(null);
    fetchProducts();
  };

  /* ================= LISTINGS ================= */
  const addListing = async () => {
    const fd = new FormData();
    Object.entries(listingForm).forEach(([k, v]) => fd.append(k, v));
    if (listingImage) fd.append("image", listingImage);

    await api.post("/listings", fd, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    });

    setListingForm({
      title: "",
      type: "cow",
      price: "",
      age: "",
      location: "",
      description: "",
    });
    setListingImage(null);
    fetchListings();
  };

  const deleteListing = async (id) => {
    if (!window.confirm("Delete listing?")) return;
    await api.delete(`/listings/${id}`, { headers: authHeader() });
    fetchListings();
  };

  const updateListing = async () => {
    await api.put(`/listings/${editListing._id}`, editListing, {
      headers: authHeader(),
    });
    setEditListing(null);
    fetchListings();
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Vendor Dashboard</h2>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/vendor-orders")}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              View Orders
            </button>

            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* VENDOR INFO */}
        {vendor && (
          <Section title="Vendor Information">
            <Info label="Name" value={vendor.name} />
            <Info label="Email" value={vendor.email} />
            <Info label="Role" value={vendor.role} />
            <Info label="Vendor ID" value={vendor._id} />
          </Section>
        )}

        {/* ADD PRODUCT */}
        <Section title="Add New Product">
          {Object.keys(productForm).map((f) => (
            <input
              key={f}
              className="input"
              placeholder={f.toUpperCase()}
              value={productForm[f]}
              onChange={(e) =>
                setProductForm({ ...productForm, [f]: e.target.value })
              }
            />
          ))}
          <input type="file" onChange={(e) => setProductImage(e.target.files[0])} />
          <button onClick={addProduct} className="btn-green">
            Add Product
          </button>
        </Section>

        {/* ADD LISTING */}
        <Section title="Add New Animal Listing">
          <input
            className="input"
            placeholder="TITLE"
            value={listingForm.title}
            onChange={(e) =>
              setListingForm({ ...listingForm, title: e.target.value })
            }
          />

          <select
            className="input"
            value={listingForm.type}
            onChange={(e) =>
              setListingForm({ ...listingForm, type: e.target.value })
            }
          >
            <option value="cow">Cow</option>
            <option value="buffalo">Buffalo</option>
            <option value="goat">Goat</option>
            <option value="sheep">Sheep</option>
          </select>

          {["price", "age", "location", "description"].map((f) => (
            <input
              key={f}
              className="input"
              placeholder={f.toUpperCase()}
              value={listingForm[f]}
              onChange={(e) =>
                setListingForm({ ...listingForm, [f]: e.target.value })
              }
            />
          ))}

          <input type="file" onChange={(e) => setListingImage(e.target.files[0])} />

          <button onClick={addListing} className="btn-orange">
            Add Listing
          </button>
        </Section>

        {/* MY LISTINGS */}
<h3 className="text-xl font-semibold mb-4">
  My Animal Listings
</h3>

<div className="grid md:grid-cols-2 gap-4 mb-10">
  {listings.map((l) => (
    <div
      key={l._id}
      className="border p-4 rounded flex gap-4"
    >
      {/* IMAGE */}
      {l.image && (
        <img
          // src={`http://localhost:5000${l.image}`}
          src={`${import.meta.env.VITE_API_URL}${image}`}

          alt={l.title}
          className="w-24 h-24 object-cover rounded"
        />
      )}

      {/* DETAILS */}
      <div className="flex-1">
        <h4 className="font-semibold">{l.title}</h4>

        <p className="text-sm">
          {l.type} • {l.age} yrs
        </p>

        <p className="text-sm">{l.location}</p>

        <p className="text-green-600 font-bold">
          ₹{l.price}
        </p>

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setEditListing(l)}
            className="btn-blue"
          >
            Edit
          </button>

          <button
            onClick={() => deleteListing(l._id)}
            className="btn-red"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

        {/* MY PRODUCTS */}
        <h3 className="text-xl font-semibold mb-4">My Products</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-4 rounded flex gap-4">
              {p.image && (
                <img
                  // src={`http://localhost:5000${p.image}`}
                  
          src={`${import.meta.env.VITE_API_URL}${image}`}
                  className="w-20 h-20 object-cover"
                />
              )}
              <div>
                <h4 className="font-semibold">{p.name}</h4>
                <p>Stock: {p.stock}</p>
                <p className="text-green-600 font-bold">₹{p.price}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditProduct(p)}
                    className="btn-blue"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="btn-red"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT PRODUCT MODAL */}
      {editProduct && (
        <EditModal
          data={editProduct}
          onChange={setEditProduct}
          onSave={updateProduct}
          onClose={() => setEditProduct(null)}
        />
      )}

      {/* EDIT LISTING MODAL */}
      {editListing && (
        <EditModal
          data={editListing}
          onChange={setEditListing}
          onSave={updateListing}
          onClose={() => setEditListing(null)}
        />
      )}

      <Footer />
    </>
  );
};

/* ================= REUSABLE ================= */
const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-semibold break-all">{value}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white p-6 rounded shadow mb-8">
    <h3 className="font-semibold mb-4">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const EditModal = ({ data, onChange, onSave, onClose, type }) => {
  const PRODUCT_FIELDS = [
    { key: "name", label: "Product Name", type: "text" },
    { key: "price", label: "Price (₹)", type: "number" },
    { key: "stock", label: "Stock Quantity", type: "number" },
    { key: "description", label: "Description", type: "textarea" },
  ];

  const LISTING_FIELDS = [
    { key: "title", label: "Animal Title", type: "text" },
    { key: "type", label: "Animal Type", type: "select" },
    { key: "price", label: "Price (₹)", type: "number" },
    { key: "age", label: "Age (Years)", type: "number" },
    { key: "location", label: "Location", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
  ];

  const fields = type === "listing" ? LISTING_FIELDS : PRODUCT_FIELDS;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[420px] max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          Edit {type === "listing" ? "Animal Listing" : "Product"}
        </h3>

        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                {field.label}
              </label>

              {/* TEXTAREA */}
              {field.type === "textarea" && (
                <textarea
                  className="border rounded px-3 py-2 text-sm"
                  rows={3}
                  value={data[field.key] || ""}
                  onChange={(e) =>
                    onChange({ ...data, [field.key]: e.target.value })
                  }
                />
              )}

              {/* SELECT */}
              {field.type === "select" && (
                <select
                  className="border rounded px-3 py-2 text-sm"
                  value={data[field.key]}
                  onChange={(e) =>
                    onChange({ ...data, [field.key]: e.target.value })
                  }
                >
                  <option value="cow">Cow</option>
                  <option value="buffalo">Buffalo</option>
                  <option value="goat">Goat</option>
                  <option value="sheep">Sheep</option>
                </select>
              )}

              {/* INPUT */}
              {field.type !== "textarea" &&
                field.type !== "select" && (
                  <input
                    type={field.type}
                    className="border rounded px-3 py-2 text-sm"
                    value={data[field.key] || ""}
                    onChange={(e) =>
                      onChange({ ...data, [field.key]: e.target.value })
                    }
                  />
                )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};




export default VendorDashboard;
