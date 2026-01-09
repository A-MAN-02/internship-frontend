import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import ProductsSection from "../components/Products/ProductSection";

const Shop = () => {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 pt-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">
            Shop Products
          </h1>

          {/* 🔥 SAME PRODUCTS AS HOME */}
          <ProductsSection />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;
