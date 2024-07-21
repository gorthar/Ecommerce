import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

interface ChartOneProps {
  monthlyRevenue: number[];
  monthlyOrders: number[];
}

const ChartOne: React.FC<ChartOneProps> = ({
  monthlyRevenue,
  monthlyOrders,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({
    revenue: true,
    orders: true,
  });

  const [state, setState] = useState<{
    series: { name: string; data: number[] }[];
  }>({
    series: [
      {
        name: "Revenue",
        data: monthlyRevenue,
      },
      {
        name: "Orders",
        data: monthlyOrders,
      },
    ],
  });

  useEffect(() => {
    const newSeries = [];
    if (selectedOptions.revenue) {
      newSeries.push({
        name: "Revenue",
        data: monthlyRevenue,
      });
    }
    if (selectedOptions.orders) {
      newSeries.push({
        name: "Orders",
        data: monthlyOrders,
      });
    }
    setState({ series: newSeries });
  }, [monthlyRevenue, monthlyOrders, selectedOptions]);

  const options: ApexOptions = {
    // ... (keep the existing options)
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      // ... (keep other xaxis options)
    },
    yaxis:
      selectedOptions.revenue && selectedOptions.orders
        ? [
            {
              title: {
                text: "Revenue ($)",
              },
              min: 0,
              max: Math.max(...monthlyRevenue) * 1.5,
            },
            {
              opposite: true,
              title: {
                text: "Orders",
              },
              min: 0,
              max: Math.max(...monthlyOrders) * 2,
            },
          ]
        : [
            {
              title: {
                text: selectedOptions.revenue ? "Revenue ($)" : "Orders",
              },
              min: 0,
              max: selectedOptions.revenue
                ? Math.max(...monthlyRevenue) * 1.5
                : Math.max(...monthlyOrders) * 2,
            },
          ],
  };

  const handleOptionChange = (option: "revenue" | "orders") => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <input
                type="checkbox"
                checked={selectedOptions.revenue}
                onChange={() => handleOptionChange("revenue")}
              />
            </span>
            <div className="w-full">
              <p className="font-semibold text-blue-600">Total Revenue</p>
              <p className="text-sm font-medium">Monthly Data</p>
            </div>
          </div>
          <div className="flex min-w-47">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-gray-200">
              <input
                type="checkbox"
                checked={selectedOptions.orders}
                onChange={() => handleOptionChange("orders")}
              />
            </span>
            <div className="w-full">
              <p className="font-semibold text-cyan-500">Total Orders</p>
              <p className="text-sm font-medium">Monthly Data</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
