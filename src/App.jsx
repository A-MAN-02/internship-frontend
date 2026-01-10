import { Route, Routes } from "react-router-dom";

/* ===== USER PAGES ===== */
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Checkout from "./Pages/Checkout";
import PaymentGateway from "./Pages/PaymentGateway";
import OrderSuccess from "./Pages/OrderSuccess";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import MyOrders from "./Pages/MyOrders";
import TrackOrder from "./Pages/TrackOrder";
import VendorAddListing from "./Pages/VendorAddListing";
import Doctor from "./Pages/Doctor";
import CustomerDashboard from "./Pages/CustomerDashboard";

/* ===== SHOP ===== */
import Shop from "./Pages/Shop";

/* ===== PRODUCT / LISTING ===== */
import ProductDetail from "./components/Products/ProductDetail";
import ListingDetail from "./components/Listings/ListingDetail";
import Listing from "./Pages/Listing";

/* ===== VENDOR ===== */
import VendorDashboard from "./Pages/VendorDashboard";
import VendorOrders from "./Pages/VendorOrders";

/* ===== ADMIN ===== */
import AdminDashboard from "./Pages/AdminDashboard";

const App = () => {
  return (
    <Routes>

      {/* ===== USER ===== */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/orders/:id" element={<TrackOrder />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<PaymentGateway />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/vendor-listing" element={<VendorAddListing />} />
      <Route path="/doctor" element={<Doctor />} />

      {/* ===== SHOP ===== */}
      <Route path="/shop" element={<Shop />} />
      <Route path="/listing" element={<Listing />} />

      {/* ===== PRODUCT / LISTING ===== */}
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/listing/:id" element={<ListingDetail />} />

      {/* ===== VENDOR ===== */}
      <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      <Route path="/vendor-orders" element={<VendorOrders />} />

      {/* ===== ADMIN ===== */}
      <Route path="/admin" element={<AdminDashboard />} />

    </Routes>
  );
};

export default App;
