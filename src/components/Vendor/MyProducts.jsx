import { useEffect, useState } from "react";
import { getVendorProducts } from "../../api/products";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVendorProducts()
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  if (!products.length) {
    return (
      <p className="text-center text-gray-500">
        No products added yet
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">
              Stock: {product.stock}
            </p>
          </div>

          <div className="font-bold text-green-600">
            ₹{product.price}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProducts;
