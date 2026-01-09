import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

import ShopByPet from "../components/Home/ShopByPet";
import HeroBanner from "../components/Home/HeroBanner";
import PromoSlider from "../components/Home/PromoSlider";
import ProductsSection from "../components/Products/ProductSection";
import ListingsSection from "../components/Listings/ListingsSection";
import PromoBanners from "../components/Promotions/PromoBanners";
import EverythingNeeded from "../components/Categories/EverythingNeeded";
// import SecondaryBanners from "../components/home/SecondaryBanners"; (next step)

const HomePage = () => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        <ShopByPet />
        <HeroBanner />
        {/* <SecondaryBanners /> */}
        <PromoSlider />
        <ProductsSection />
        <ListingsSection />
        <PromoBanners />
        <EverythingNeeded />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
