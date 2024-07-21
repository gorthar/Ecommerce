import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import apiConnector from "@/ApiConnector/connector";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  async function submitForm(data: FieldValues) {
    setIsLoading(true);
    const productData = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      pictureUrl: data.pictureUrl,
      type: data.type,
      brand: data.brand,
      quantityInStock: parseInt(data.quantityInStock),
    };

    try {
      await apiConnector.Products.create(productData);
      toast.success("Product added successfully");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setIsLoading(false);
    }
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Add New Product
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Product Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", {
                      required: "Product name is required",
                    })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Price*
                  </label>
                  <input
                    type="number"
                    id="price"
                    step="0.01"
                    {...register("price", {
                      required: "Price is required",
                      min: 0,
                    })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message as string}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Description*
                  </label>
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter product description"
                  ></textarea>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="pictureUrl"
                    className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Picture URL*
                  </label>
                  <input
                    type="url"
                    id="pictureUrl"
                    {...register("pictureUrl", {
                      required: "Picture URL is required",
                    })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.pictureUrl && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.pictureUrl.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Product Type*
                  </label>
                  <input
                    type="text"
                    id="type"
                    {...register("type", {
                      required: "Product type is required",
                    })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter product type"
                  />
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.type.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="brand"
                    className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Brand*
                  </label>
                  <input
                    type="text"
                    id="brand"
                    {...register("brand", { required: "Brand is required" })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter brand name"
                  />
                  {errors.brand && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.brand.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="quantityInStock"
                    className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Quantity in Stock*
                  </label>
                  <input
                    type="number"
                    id="quantityInStock"
                    {...register("quantityInStock", {
                      required: "Quantity is required",
                      min: 0,
                    })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="0"
                  />
                  {errors.quantityInStock && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.quantityInStock.message as string}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-bold  text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
          >
            {isLoading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </section>
  );
}
