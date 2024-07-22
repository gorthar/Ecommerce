import { useState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import apiConnector from "@/ApiConnector/connector";
import { toast } from "react-toastify";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantityInStock: number;
}

export default function EditProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const fetchedProducts = await apiConnector.Products.list();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  }

  function handleProductClick(product: Product) {
    setSelectedProduct(product);
    setSearchTerm(product.name); // Set the search term to the product name (highlight the selected product in the list)
    reset(product);
  }

  async function updateProduct(data: FieldValues) {
    if (!selectedProduct) return;

    setIsLoading(true);
    const updatedProductData = {
      ...selectedProduct,
      ...data,
      price: parseFloat(data.price),
      quantityInStock: parseInt(data.quantityInStock),
    };

    try {
      await apiConnector.Products.update(updatedProductData);
      toast.success("Product updated successfully");
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteProduct(id: string) {
    setIsLoading(true);
    try {
      await apiConnector.Products.delete(id);
      toast.success("Product deleted successfully");
      setSelectedProduct(null);
      fetchProducts(); // Refresh the product list
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  }

  function handleFormClear() {
    setSearchTerm("");
    setSelectedProduct(null);
    reset();
  }

  return (
    <section className=" py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
          Manage Product
        </h2>

        <div className="mb-8 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => handleFormClear()}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-md hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  src={product.pictureUrl}
                  alt={product.name}
                  className="mb-4 h-40 w-full object-cover"
                />
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}

        {selectedProduct && (
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold  text-gray-900 dark:text-white">
              Product Fields
            </h3>
            <form onSubmit={handleSubmit(updateProduct)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
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
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
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
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
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
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
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
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
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
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Brand*
                  </label>
                  <input
                    type="text"
                    id="brand"
                    {...register("brand", { required: "Brand is required" })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
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
                  />
                  {errors.quantityInStock && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.quantityInStock.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                  >
                    {isLoading ? "Updating Product..." : "Update Product"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(null);
                      setSearchTerm("");
                    }}
                    className="rounded-lg bg-gray-300 px-5 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  >
                    Cancel
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      !window.confirm(
                        "Are you sure you want to delete this product?"
                      )
                    )
                      return;
                    deleteProduct(selectedProduct.id);
                  }}
                  className="rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Delete Product
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
