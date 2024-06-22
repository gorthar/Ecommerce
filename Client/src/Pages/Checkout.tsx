import { FieldValues, useForm } from "react-hook-form";
import CartStatusBar from "../Components/Cart/CartStatusBar";
import { useStoreContext } from "../Context/useStoreContext";
import { LoaderCircle } from "lucide-react";
import apiConnector from "@/ApiConnector/connector";
import { CreateOrder } from "@/types/Order";

function Checkout() {
  const { cart, setCart } = useStoreContext();
  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm({
    mode: "onBlur",
  });
  const total =
    cart?.items.reduce((acc, item) => acc + item.price * item.quantity, 0) ?? 0;

  async function submitForm(data: FieldValues) {
    const createOrder: CreateOrder = {
      shipToAddress: {
        fullName: data.name,
        adress1: data.address1,
        adress2: data.address2,
        city: data.city,
        state: "",
        postCode: data.postcode,
        country: data.country,
      },
      saveAddress: data.SaveAddress,
    };
    try {
      apiConnector.Orders.create(createOrder);
      setCart(null);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section className="bg-gray-200 py-8 antialiased dark:bg-gray-900 md:py-16">
      <CartStatusBar status={1} />
      <form
        onSubmit={handleSubmit(submitForm)}
        className="mx-auto max-w-screen-xl px-4 2xl:px-0"
      >
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Delivery Details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="your_name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Your name{" "}
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Bonnie Green"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="your_email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Address*{" "}
                  </label>
                  <input
                    type="address1"
                    id="address1"
                    {...register("address1", { required: true })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Address"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="address2"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Address 2{" "}
                  </label>
                  <input
                    type="address2"
                    id="address2"
                    {...register("address2", { required: false })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Address"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <label
                      htmlFor="select-country-input-3"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Country*{" "}
                    </label>
                  </div>
                  <select
                    id="select-country-input-3"
                    {...register("country", { required: true })}
                    defaultValue={"Canada"}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  >
                    <option value={"Canada"}>Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="United States">United States</option>
                    <option value="Spain">Spain</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <label
                      htmlFor="select-city-input"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      City*{" "}
                    </label>
                  </div>
                  <select
                    defaultValue={"VA"}
                    id="select-city-input"
                    {...register("city", { required: true })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  >
                    <option value="Vancouver">Vancouver</option>
                    <option value="Edmonton">Edmonton</option>
                    <option value="Calgary">Calgary</option>
                    <option value="Toronto">Toronto</option>
                    <option value="Hallifax">Hallifax</option>
                    <option value="Ottawa">Ottawa</option>
                    <option value="Montreal">Montreal</option>
                    <option value="Fredericton">Fredericton</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="postcode"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Post Code*{" "}
                  </label>
                  <input
                    type="text"
                    id="postcode"
                    {...register("postcode", {
                      required: true,
                    })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="V3T2W1"
                    required
                  />
                  {errors.postcode?.type === "required" && (
                    <p className=" text-red-700 ">Postcode is required</p>
                  )}
                </div>

                <br />
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="SaveAddress"
                    {...register("SaveAddress")}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label
                    htmlFor="SaveAddress"
                    className="ml-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Save this information for next time
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
          <div className="flow-root">
            <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
              <dl className="flex items-center justify-between gap-4 py-3">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Subtotal
                </dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                  ${total.toFixed(2)}
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4 py-3">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Savings
                </dt>
                <dd className="text-base font-medium text-green-500">0</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4 py-3">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Shipment
                </dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                  $13
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4 py-3">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Tax
                </dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                  ${(total * 0.12).toFixed(2)}
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4 py-3">
                <dt className="text-base font-bold text-gray-900 dark:text-white">
                  Total
                </dt>
                <dd className="text-base font-bold text-gray-900 dark:text-white">
                  ${(total + total * 0.12 + 13).toFixed(2)}
                </dd>
              </dl>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-gray-300 dark:hover:text-gray-100 font-bold w-full text-center"
            >
              {isLoading ? <LoaderCircle /> : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
export default Checkout;
