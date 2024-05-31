import axios from "axios";
import { useParams } from "react-router-dom";
import { Product } from "../types/Product";
import { useEffect, useState } from "react";
import YellowStart from "../Components/Util/YellowStart";
import GreyStar from "../Components/Util/GreyStar";
import LoadingSpinner from "../Components/Util/LoadingSpinner";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `http://localhost:5000/api/Products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!product) {
    return (
      <div className="font-bold w-full h-96 text-center text-2xl mt-96 dark:text-gray-200">
        Item not found
      </div>
    );
  }
  if (error) {
    return (
      <div className="font-bold w-full h-96 text-center text-2xl mt-96 dark:text-gray-200">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-20 flex flex-wrap justify-center gap-5 md:gap-10">
      <div className="flex items-center justify-center">
        <img
          className="w-96 h-96 object-cover rounded-lg"
          src={
            product?.pictureUrl ||
            "https://via.placeholder.com/400x300?text=Product+Image"
          }
          alt={product?.name}
        />
      </div>
      <div className="flex flex-col items-center mt-10 mx-4 sm:mx-2 md:mx-0">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
          {product?.name}
        </h1>

        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-5">
          ${product?.price.toFixed(2)}
        </p>
        <p className="text-lg text-gray-900 dark:text-white mt-5 mx-2">
          {product?.description}
        </p>
        <div className="flex items-center justify-center mt-10">
          <div className="flex items-center space-x-1 rtl:space-x-reverse ">
            {[...Array(Math.ceil(product?.starRating || 0))].map((_, i) => (
              <YellowStart key={i} />
            ))}
            {[...Array(5 - Math.ceil(product?.starRating || 0))].map((_, i) => (
              <GreyStar key={i} />
            ))}
          </div>
          <div className="flex items-center">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {product?.starRating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
