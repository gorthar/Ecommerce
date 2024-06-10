import { Link } from "react-router-dom";
import { Product } from "../../types/Product";
import GreyStar from "../Util/GreyStar";
import YellowStart from "../Util/YellowStart";
import { useStoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";

interface ProductProps {
  product: Product;
}

function ProductCard({ product }: ProductProps) {
  const { addOneToCart } = useStoreContext();
  const fullStar = Math.ceil(product.starRating);
  const emptyStar = 5 - fullStar;

  function addToCart() {
    addOneToCart(product.id);
    toast.success("Product added to cart");
  }

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4 overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <img
          className="w-full h-56 object-cover rounded-t-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          src={
            product.pictureUrl ||
            "https://via.placeholder.com/400x300?text=Product+Image"
          }
          alt={product.name}
        />
      </Link>
      <div className="px-5 pb-5">
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(fullStar)].map((_, i) => (
              <YellowStart key={i} />
            ))}

            {[...Array(emptyStar)].map((_, i) => (
              <GreyStar key={i} />
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {product.starRating.toFixed(1)}
          </span>
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white ">
          {product.name}
        </h2>
        <div className="flex justify-between mt-2">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={addToCart}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-gray-300 dark:hover:text-gray-100 font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
