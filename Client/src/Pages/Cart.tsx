import { useEffect, useState } from "react";
import LoadingSpinner from "../Components/Util/LoadingSpinner";
import { useStoreContext } from "../Context/StoreContext";
import CartItem from "../Components/Cart/CartItem";
import { Link } from "react-router-dom";
import CartStatusBar from "../Components/Cart/CartStatusBar";

function Cart() {
  const { cart, removeItem, addOneToCart } = useStoreContext();
  const [cartItems, setCartItems] = useState<BasketItem[]>(cart?.items || []);
  const [loading, setLoading] = useState(true);
  const [savings, setSavings] = useState(0);
  const total =
    cart?.items.reduce((acc, item) => acc + item.price * item.quantity, 0) ?? 0;
  useEffect(() => {
    setCartItems(cart?.items || []);
    setLoading(false);
  }, [cart]);

  function removeFromCart(item: BasketItem) {
    removeItem(item.productId, item.quantity);
    cartItems.splice(
      cartItems.findIndex((i) => i.productId === item.productId),
      1
    );
  }

  function removeOneFromCart(item: BasketItem) {
    if (item.quantity === 1) {
      return removeFromCart(item);
    }
    removeItem(item.productId, 1);
  }

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!cart || cart.items.length === 0) {
    return (
      <div className="dark:text-gray-200 text-center mt-64 font-semibold text-3xl">
        Cart is Empty
      </div>
    );
  }
  return (
    <div className="py-8 md:pt-16 mx-auto max-w-screen-2xl">
      <CartStatusBar status={0} />
      <div className="sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        <div className="">
          {cartItems.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              removeOneFromCart={removeOneFromCart}
              removeFromCart={removeFromCart}
              addOneToCart={addOneToCart}
            />
          ))}
        </div>
        <div className="mx-auto mt- max-w-xl flex-1 space-y-6 lg:mt-5 lg:w-full min-w-80">
          <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-200 p-4 shadow-sm dark:border-gray-400 dark:bg-gray-800 sm:p-6">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              Order summary
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Original price
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ${total.toFixed(2)}
                  </dd>
                </dl>
                {savings > 0 && (
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-600"></dd>
                  </dl>
                )}
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Shipment
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    $13.00
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Tax
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ${(total * 0.12).toFixed(2)}
                  </dd>
                </dl>
              </div>

              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-base font-bold text-gray-900 dark:text-white">
                  Total
                </dt>
                <dd className="text-base font-bold text-gray-900 dark:text-white">
                  ${(total + total * 0.12 + 13 - savings).toFixed(2)}
                </dd>
              </dl>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Link
                to="/checkout"
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-gray-300 dark:hover:text-gray-100 font-bold w-full text-center"
              >
                Proceed to Checkout
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {" "}
                or{" "}
              </span>
              <Link
                to="/"
                title=""
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-gray-200 dark:hover:text-gray-300"
              >
                Continue Shopping
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
