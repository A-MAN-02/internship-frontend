import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../data/products";

const PromoSlider = () => {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const cardRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (cardRef.current && trackRef.current) {
      setCardWidth(cardRef.current.offsetWidth + 16);
      setContainerWidth(trackRef.current.offsetWidth);
    }
  }, []);

  const totalWidth = PRODUCTS.length * cardWidth;
  const maxTranslate = Math.max(0, totalWidth - containerWidth);
  const translateX = Math.min(index * cardWidth, maxTranslate);

  const next = () => {
    if (translateX < maxTranslate) setIndex((p) => p + 1);
    else setIndex(0);
  };

  const prev = () => setIndex((p) => Math.max(p - 1, 0));

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  });

  return (
    <section className="container mx-auto px-4 mt-6 relative overflow-hidden">
      <button onClick={prev} className="absolute left-2 top-1/2 z-10 bg-white p-2 rounded-full">
        <HiChevronLeft />
      </button>

      <div ref={trackRef} className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-700"
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {PRODUCTS.map((product, i) => (
            <div
              key={product.id}
              ref={i === 0 ? cardRef : null}
              onClick={() => navigate(`/product/${product.id}`)}
              className="min-w-[300px] h-[180px] rounded-xl overflow-hidden shadow cursor-pointer"
            >
              <img src={product.image} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <button onClick={next} className="absolute right-2 top-1/2 z-10 bg-white p-2 rounded-full">
        <HiChevronRight />
      </button>
    </section>
  );
};

export default PromoSlider;
