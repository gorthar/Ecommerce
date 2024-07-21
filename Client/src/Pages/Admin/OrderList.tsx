/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import apiConnector from "@/ApiConnector/connector";
import { toast } from "react-toastify";
import LoadingSpinner from "@/Components/Util/LoadingSpinner";
import Table from "../Admin/Ordertable";

interface Order {
  id: number;
  userEmail: string;
  orderDate: string;
  status: number;
  subtotal: number;
  deliveryPrice: number;
}

interface OrderFilterParams {
  startDate?: string;
  endDate?: string;
  status?: number;
  customerEmail?: string;
  searchTerm?: string;
}

function debounce(func: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterParams, setFilterParams] = useState<OrderFilterParams>({});
  const [inputValues, setInputValues] = useState<OrderFilterParams>({});

  const debouncedSetFilterParams = useMemo(
    () => debounce(setFilterParams, 300),
    []
  );

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedOrders = await apiConnector.Orders.listForAdmin(
        filterParams
      );
      setOrders(fetchedOrders);
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  }, [filterParams]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
    debouncedSetFilterParams((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterParams(inputValues);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  function clearFilters() {
    setInputValues({});
    setFilterParams({});
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className="text-2xl font-semibold leading-tight">Orders</h2>
        <form
          onSubmit={handleSubmit}
          className="my-2 flex sm:flex-row flex-col"
        >
          <div className="flex flex-row mb-1 sm:mb-0">
            <input
              type="date"
              name="startDate"
              value={inputValues.startDate || ""}
              onChange={handleFilterChange}
              className="border rounded-lg px-3 py-1 mr-2"
              placeholder="Start Date"
            />
            <input
              type="date"
              name="endDate"
              value={inputValues.endDate || ""}
              onChange={handleFilterChange}
              className="border rounded-lg px-3 py-1 mr-2"
              placeholder="End Date"
            />
            <select
              name="status"
              value={inputValues.status || ""}
              onChange={handleFilterChange}
              className="border rounded-lg px-3 py-1 mr-2"
            >
              <option value="">All Statuses</option>
              <option value="0">Pending</option>
              <option value="1">Received</option>
              <option value="2">Failed</option>
              <option value="3">Shipped</option>
              <option value="4">Delivered</option>
            </select>
          </div>
          <div className="flex flex-row mb-1 sm:mb-0">
            <input
              type="text"
              name="customerEmail"
              value={inputValues.customerEmail || ""}
              onChange={handleFilterChange}
              className="border rounded-lg px-3 py-1 mr-2"
              placeholder="Customer Email"
            />
            <button
              type="button"
              onClick={() => clearFilters()}
              className="border rounded-lg px-3 py-1 bg-red-500 text-white"
            >
              Clear Filters
            </button>
            <button
              type="submit"
              className="border rounded-lg px-3 py-1 bg-blue-500 text-white"
            >
              Apply Filters
            </button>
          </div>
        </form>
        <Table orders={orders} />
      </div>
    </div>
  );
}
