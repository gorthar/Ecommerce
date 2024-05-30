// src/components/ProductList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../types/Product";
import ProductCard from "./ProductCard";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      <h1 className="font-semibold text-4xl my-8 text-gray-900 dark:text-gray-200 hover:animate-bounce cursor-default">
        Product List
      </h1>
      <div className="flex flex-wrap justify-center p-0 m-0">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
