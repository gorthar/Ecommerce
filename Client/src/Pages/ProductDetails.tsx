import { useParams } from "react-router-dom";
import { Product } from "../types/Product";
import { useEffect, useState } from "react";
import YellowStart from "../Components/Util/YellowStart";
import GreyStar from "../Components/Util/GreyStar";
import LoadingSpinner from "../Components/Util/LoadingSpinner";
import apiConnector from "../ApiConnector/connector";
import NotFoundPage from "./NotFoundPage";
import { useStoreContext } from "../Context/StoreContext";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addOneToCart } = useStoreContext();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const response = await apiConnector.Products.details(id);
        setProduct(response);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
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
    return <NotFoundPage />;
  }
  function addToCart() {
    if (!product) return;
    addOneToCart(product.id);
    toast.success("Product added to cart");
  }

  return (
    <div className="max-w-7xl mx-10 xl:mx-auto  mt-20 flex flex-wrap md:flex-nowrap justify-center gap-5 md:gap-10">
      <div className="flex items-center shrink-0 justify-center bg-white rounded">
        <img
          className="w-96 h-96 md:h-[50vw] md:w-[50vw] lg:h-[40vw] lg:w-[40vw] xl:max-w-[760px]  xl:max-h-[760px] object-contain rounded-lg"
          src={
            product?.pictureUrl ||
            "https://via.placeholder.com/400x300?text=Product+Image"
          }
          alt={product?.name}
        />
      </div>
      <div className="flex flex-col  mt-10 mx-4 sm:mx-2 md:mx-0 ">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
          {product?.name}
        </h1>
        <p className="text-lg text-gray-900 dark:text-white mt-5 mx-2">
          Brand: {product?.brand}
        </p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-5">
          Price : ${product?.price.toFixed(2)}
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
        <button
          onClick={addToCart}
          className="bg-blue-500 text-white font-semibold px-4 py-4 rounded-md hover:bg-blue-600 ms-3 mt-10"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
export default ProductDetails;
