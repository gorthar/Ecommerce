// src/components/ProductList.tsx
import React, { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import ProductCard from "./ProductCard";
import ProductSelector from "./ProductSelector";
import LoadingSpinner from "../Util/LoadingSpinner";
import apiConnector from "../../ApiConnector/connector";
import { toast } from "react-toastify";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedType, setSelectedType] = useState<string>("All");
  const typesOfProducts = new Set(products.map((product) => product.type));

  function filterProducts(type: string) {
    if (type === "All") {
      return products;
    }
    return products.filter((product) => product.type === type);
  }

  const filteredProducts = filterProducts(selectedType);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiConnector.Products.list();
        setProducts(response);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center mt-10">
      {typesOfProducts.size > 1 && (
        <div className="flex space-x-2 mt-4">
          {["All", ...typesOfProducts].map((type) => (
            <ProductSelector
              key={type}
              type={type}
              setSelectedType={setSelectedType}
            />
          ))}
        </div>
      )}

      <div className="flex flex-wrap justify-center p-0 m-0 mt-10 w-full">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
