import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import ListingsSection from "../components/Listings/ListingsSection";

const Listing = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">
            Animal Listings
          </h1>

          <ListingsSection />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Listing;
