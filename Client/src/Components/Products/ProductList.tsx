// src/components/ProductList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../types/Product";
import ProductCard from "./ProductCard";
import ProductSelector from "./ProductSelector";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
        const response = await axios.get<Product[]>(
          "http://localhost:5000/api/Products"
        );
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className=" font-bold w-full h-96 text-center text-2xl mt-96 dark:text-gray-200">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
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
