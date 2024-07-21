import React from "react";
import { Link } from "react-router-dom";

interface Order {
  id: number;
  userEmail: string;
  orderDate: string;
  status: number;
  subtotal: number;
  deliveryPrice: number;
}

const getStatusColor = (status: number) => {
  switch (status) {
    case 0:
      return "bg-yellow-100 text-yellow-800";
    case 1:
      return "bg-blue-100 text-blue-800";
    case 2:
      return "bg-red-100 text-red-800";
    case 3:
      return "bg-gray-100 text-gray-800";
    case 4:
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "Pending";
    case 1:
      return "Received";
    case 2:
      return "Failed";
    case 3:
      return "Shipped";
    case 4:
      return "Delivered";
    default:
      return "Unknown";
  }
};

const OrderRow: React.FC<{ order: Order }> = ({ order }) => (
  <tr key={order.id}>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      {order.id}
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      {order.userEmail}
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      {new Date(order.orderDate).toLocaleDateString()}
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
          order.status
        )}`}
      >
        {getStatusText(order.status)}
      </span>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      ${order.subtotal.toFixed(2)}
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      ${order.deliveryPrice.toFixed(2)}
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      ${(order.subtotal + order.deliveryPrice).toFixed(2)}
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <Link
        to={`/admin/orders/${order.id}`}
        className="text-blue-600 hover:text-blue-900"
      >
        View
      </Link>
    </td>
  </tr>
);

const Table: React.FC<{ orders: Order[] }> = ({ orders }) => (
  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Customer Email
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Date
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Subtotal
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Delivery Price
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Total
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Table;
