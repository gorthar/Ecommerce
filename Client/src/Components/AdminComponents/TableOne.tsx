import React from "react";

interface AnalyticsProduct {
  id: number;
  name: string;
  revenue: number;
  orders: number;
  users: number;
  imageUrl: string;
}

interface TableOneProps {
  topSellingProducts: AnalyticsProduct[];
}

const TableOne: React.FC<TableOneProps> = ({ topSellingProducts }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-gray-700 sm:px-7 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Sellers
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-200 dark:bg-gray-800 sm:grid-cols-4">
          <div className="p-2 xl:p-5">
            <h5 className="text-sm font-medium uppercase sm:text-base dark:text-gray-300">
              Product
            </h5>
          </div>
          <div className="p-2 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase sm:text-base dark:text-gray-300">
              Revenue
            </h5>
          </div>
          <div className="p-2 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase sm:text-base dark:text-gray-300">
              Orders
            </h5>
          </div>

          <div className="hidden p-2 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase sm:text-base dark:text-gray-300">
              Image
            </h5>
          </div>
        </div>

        {topSellingProducts.map((product, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === topSellingProducts.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2 xl:p-5">
              <p className=" text-black dark:text-white sm:block">
                {product.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2 xl:p-5">
              <p className="text-black dark:text-white">
                ${product.revenue.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center justify-center p-2 xl:p-5">
              <p className="text-black dark:text-white">{product.orders}</p>
            </div>

            <div className="hidden items-center justify-center p-2 sm:flex xl:p-5">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
