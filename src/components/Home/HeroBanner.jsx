import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const banners = [
  {
    title: "CAT CARE FROM NOSE TO TAIL",
    subtitle: "Food to litter, and everything in between!",
    image: "https://picsum.photos/400/400?random=11",
    code: "MEOW15",
  },
  {
    title: "PREMIUM CAT FOOD COLLECTION",
    subtitle: "Healthy meals for happy cats!",
    image: "https://picsum.photos/400/400?random=12",
    code: "CAT20",
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  const next = () =>
    setCurrent((prev) => (prev + 1) % banners.length);

  const banner = banners[current];

  return (
    <section className="container mx-auto px-4 mt-6">
      <div className="relative bg-[#fff3e8] rounded-2xl min-h-[420px] p-10 flex items-center overflow-hidden">

        {/* LEFT ARROW */}
        <button
          onClick={prev}
          className="absolute left-4 z-20 bg-white rounded-full p-2 shadow"
        >
          <HiChevronLeft className="h-6 w-6" />
        </button>

        {/* CONTENT */}
        <div className="w-1/2 z-10">
          <h1 className="text-4xl font-bold mb-4">
            {banner.title}
          </h1>

          <p className="text-gray-600 mb-6">
            {banner.subtitle}
          </p>

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold">
            Shop Now →
          </button>
        </div>

        {/* IMAGE */}
        <div className="absolute right-10 bottom-0 w-[360px] transition-all duration-700">
          <img src={banner.image} alt="banner" className="w-full object-contain" />
        </div>

        {/* PROMO CODE */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2
                     flex items-center gap-3
                     bg-white/70 backdrop-blur-sm
                     px-6 py-3 rounded-full shadow-md"
        >
          <span className="text-orange-500">〰</span>

          <p className="text-sm text-gray-800">
            Use code{" "}
            <span className="font-bold bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
              {banner.code}
            </span>{" "}
            for <span className="font-semibold">15%</span> off your first order!
          </p>

          <span className="text-orange-500">〰</span>
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={next}
          className="absolute right-4 z-20 bg-white rounded-full p-2 shadow"
        >
          <HiChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
