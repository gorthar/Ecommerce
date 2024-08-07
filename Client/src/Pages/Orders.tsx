import apiConnector from "@/ApiConnector/connector";
import LoadingSpinner from "@/Components/Util/LoadingSpinner";
import { Order } from "@/types/Order";
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      const response = await apiConnector.Orders.list();
      const sortedOrders = response.sort(
        (a: Order, b: Order) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      setOrders(sortedOrders);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className="max-w-7xl mx-3 m:mx-auto lg:mx-auto flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold">Orders</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => toggleOrderDetails(order.id)}
          className="flex flex-col w-full sm:w-2/3 m:w-1/2 bg-gray-100 p-4 m-2 cursor-pointer dark:bg-gray-700 rounded-lg "
        >
          <h2 className="text-xl font-bold dark:text-gray-300">
            Order Date: {new Date(order.orderDate).toDateString()}{" "}
            {new Date(order.orderDate).toLocaleTimeString()}
          </h2>
          <div className="flex flex-col">
            {expandedOrderId === order.id ? (
              <>
                <div className="flex flex-col p-2 bg-gray-200 dark:bg-gray-600 rounded-lg dark:text-gray-300">
                  <h3 className="font-bold">Shipping Address:</h3>
                  <p>{order.shipToAddress.fullName}</p>
                  <p>{order.shipToAddress.address1}</p>
                  {order.shipToAddress.address2 && (
                    <p>{order.shipToAddress.address2}</p>
                  )}
                  <p>
                    {order.shipToAddress.city}, {order.shipToAddress.state}{" "}
                    {order.shipToAddress.postCode}
                  </p>
                  <p>{order.shipToAddress.country}</p>
                </div>
                {order.orderItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center p-2 m-2 bg-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-300"
                  >
                    <img
                      className="w-24 h-24"
                      src={item.pictureUrl}
                      alt={item.name}
                    />
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between dark:text-gray-300">
                  <span>Subtotal: {order.subtotal}</span>
                  <span>Delivery: {order.deliveryPrice}</span>
                  <span>Total: {order.total}</span>
                  <span>Status: {order.status}</span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex ">
                  {order.orderItems.slice(0, 3).map((item) => (
                    <img
                      key={item.productId}
                      className="w-24 h-24 m-1"
                      src={item.pictureUrl}
                      alt={item.name}
                    />
                  ))}
                </div>
                <span className="font-bold dark:text-gray-300">
                  Total: {order.total}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
