type CartItemProps = {
  item: BasketItem;
  removeOneFromCart: (item: BasketItem) => void;
  removeFromCart: (item: BasketItem) => void;
  addOneToCart: (productId: string) => void;
};

function CartItem({
  item,
  removeOneFromCart,
  removeFromCart,
  addOneToCart,
}: CartItemProps) {
  return (
    <div
      className="flex flex-row border border-gray-900 dark:border-gray-400 rounded-md  px-10 py-5 my-5 dark:bg-gray-800 dark:text-gray-200 gap-5 flex-wrap md:flex-nowrap justify-center max-w-5xl mx-2 lg:mx-auto"
      key={item.productId}
    >
      <div className="lg:bg-gray-300 rounded-lg">
        <img
          className="w-96 h-96 md:h-[20vw] md:w-[20vw] lg:h-[30vw] lg:w-[30vw] xl:max-w-[760px]  xl:max-h-[760px] object-contain rounded-lg"
          src={
            item.pictureUrl ||
            "https://via.placeholder.com/400x300?text=Product+Image"
          }
          alt={item.productName}
        />
      </div>
      {/*Tailwind CSS classes for the product details*/}
      <div className="flex flex-col justify-around my-1 mx-4 sm:mx-2 md:mx-0 w-full">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-200">
          {item.productName}
        </h1>
        <h2 className="text-lg text-gray-900 dark:text-gray-200 mt-5 ">
          Brand: {item.brand} - {item.type}
        </h2>

        <div className="flex gap-5 items-center mt-2">
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-200 ">
            Price : ${(item.price * item.quantity).toFixed(2)}
          </p>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => removeOneFromCart(item)}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-gray-300 dark:hover:text-gray-100 font-bold "
            >
              -
            </button>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
              {item.quantity}
            </p>
            <button
              onClick={() => addOneToCart(item.productId)}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-gray-300 dark:hover:text-gray-100 font-bold"
            >
              +
            </button>
          </div>
        </div>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-300  dark:bg-red-700 dark:hover:bg-red-900 dark:text-gray-300 dark:hover:text-gray-100 font-bold mt-4"
          onClick={() => removeFromCart(item)}
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
}
export default CartItem;
