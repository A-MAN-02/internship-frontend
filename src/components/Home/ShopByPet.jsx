const pets = [
  { name: "Dogs", img: "https://picsum.photos/200/300?random=5" },
  { name: "Cats", img: "https://picsum.photos/200/300?random=6 " }, 
  { name: "Buffalo", img: "https://picsum.photos/200/300?random=7" },
  { name: "Goat", img: "https://picsum.photos/200/300?random=8" },
  { name: "Sheep", img: "https://picsum.photos/200/300?random=9" },
  { name: "Hen", img: "https://picsum.photos/200/300?random=10" },
]; 

const  ShopByPet = () => {
  return (
    <section className="container mx-auto px-4 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-semibold text-lg">Shop by Pet</h2>
        <span className="text-orange-500 text-xl">›</span>
      </div>

      <div className="flex gap-6 overflow-x-auto">
        {pets.map((pet) => (
          <div
            key={pet.name}
            className="flex flex-col items-center cursor-pointer min-w-22.5"
          >
            <img
              src={pet.img}
              alt={pet.name}
              className="w-20 h-20 rounded-lg object-cover shadow"
            />
            <p className="mt-2 text-sm font-medium">{pet.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByPet;
