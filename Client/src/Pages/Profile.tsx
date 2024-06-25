import { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import apiConnector from "@/ApiConnector/connector";

import { toast } from "react-toastify";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    mode: "onBlur",
  });
  useEffect(() => {
    apiConnector.Account.fetchAddresses().then((response) => {
      console.log(response);
      if (response) {
        reset({ ...getValues(), ...response, SaveAddress: false });
      }
    });
    setIsLoading(false);
  }, []);
  async function submitForm(data: FieldValues) {
    const shipToAddress = {
      fullName: data.fullName,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: "",
      postCode: data.postCode,
      country: data.country,
    };

    try {
      await apiConnector.Account.saveAddress(shipToAddress);
      toast.success("Address saved successfully");
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>; // Use your LoadingSpinner component here
  }

  return (
    <section className="bg-gray-200 py-8 antialiased dark:bg-gray-900 md:py-16">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="mx-auto max-w-screen-xl px-4 2xl:px-0"
      >
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                User Profile
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Your name{" "}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    {...register("fullName", { required: true })}
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
                    id="postCode"
                    {...register("postCode", {
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
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-gray-300 dark:hover:text-gray-100 font-bold w-full text-center"
          >
            Save Address
          </button>
        </div>
      </form>
    </section>
  );
}
