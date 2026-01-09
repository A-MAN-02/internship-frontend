const PromoBanners = () => {
  return (
    <section className="container mx-auto px-4 mt-20">

      {/* TOP FULL WIDTH BANNER */}
      <div className="bg-gray-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between mb-8">

        {/* TEXT */}
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-2">
            Genuine meds for healthier pets
          </h2>
          <p className="text-gray-600 mb-4">
            FLAT 5% off on orders above ₹1000
          </p>
          <p className="text-sm mb-6">
            Use code <span className="font-semibold text-orange-500">PHARMA5</span>
          </p>

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition">
            SHOP NOW →
          </button>
        </div>

        {/* IMAGE */}
        <img
          src="https://picsum.photos/400/250?random=301"
          alt="Pet Medicines"
          className="mt-6 md:mt-0 w-full md:w-[380px] object-contain"
        />
      </div>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT BIG CARD */}
        <div className="bg-gradient-to-r from-green-200 to-green-100 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-3">
              Fastest delivery on pet medicines
            </h3>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium">
              SHOP NOW →
            </button>
          </div>

          <img
            src="https://picsum.photos/250/200?random=302"
            alt="Fast Delivery"
            className="w-40 object-contain"
          />
        </div>

        {/* RIGHT STACK */}
        <div className="flex flex-col gap-6">

          {/* CARD 1 */}
          <div className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-3">
                Specialised prescription diets
              </h3>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium">
                SHOP NOW →
              </button>
            </div>

            <img
              src="https://picsum.photos/200/180?random=303"
              alt="Prescription Diet"
              className="w-32 object-contain"
            />
          </div>

          {/* CARD 2 */}
          <div className="bg-gray-900 rounded-2xl p-6 flex items-center justify-between text-white">
            <div>
              <h3 className="text-xl font-bold mb-2">
                Get Instant Advice
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Chat with an expert vet
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full font-medium">
                CHAT NOW →
              </button>
            </div>

            <img
              src="https://picsum.photos/220/180?random=304"
              alt="Vet Advice"
              className="w-36 object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
