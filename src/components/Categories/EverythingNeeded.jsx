const categories = [
  {
    title: "Beds & Mats",
    image: "https://picsum.photos/400/200?random=401",
  },
  {
    title: "Pet Doctors",
    image: "https://picsum.photos/400/200?random=402",
  },
  {
    title: "Cat Beds",
    image: "https://picsum.photos/400/200?random=403",
  },
  {
    title: "Premium Cat Food",
    image: "https://picsum.photos/400/200?random=404",
  },
  {
    title: "Walk Gear",
    image: "https://picsum.photos/400/200?random=405",
  },
  {
    title: "Supplements",
    image: "https://picsum.photos/400/200?random=406",
  },
  {
    title: "Premium Dog Supplies",
    image: "https://picsum.photos/400/200?random=407",
  },
  {
    title: "Pure Ghee",
    image: "https://picsum.photos/400/200?random=408",
  },
];

const EverythingNeeded = () => {
  return (
    <section className="container mx-auto px-4 mt-20">

      {/* TITLE */}
      <div className="flex items-center justify-center gap-6 mb-10">
        <div className="flex-1 h-px bg-gray-300"></div>
        <h2 className="text-2xl font-semibold whitespace-nowrap">
          Everything that is needed
        </h2>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((item, index) => (
          <div
            key={index}
            className="
              relative rounded-xl overflow-hidden cursor-pointer
              shadow-sm hover:shadow-lg transition
            "
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-32 object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition" />

            {/* TEXT */}
            <h3 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg text-center px-2">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EverythingNeeded;
