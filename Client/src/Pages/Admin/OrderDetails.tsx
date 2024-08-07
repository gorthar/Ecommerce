import { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import apiConnector from "@/ApiConnector/connector";
import { toast } from "react-toastify";
import { useStoreContext } from "@/Context/useStoreContext";
import LoadingSpinner from "@/Components/Util/LoadingSpinner";
import { ArrowLeft } from "lucide-react";

interface ShipToAddress {
  fullName: string | null;
  address1: string | null;
  address2: string | null;
  city: string;
  state: string;
  postCode: string;
  country: string;
}

interface ItemOrdered {
  productId: number;
  name: string;
  pictureUrl: string;
}

interface OrderItem {
  id: number;
  itemOrdered: ItemOrdered;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  userEmail: string;
  orderDate: string;
  shipToAddress: ShipToAddress;
  orderItems: OrderItem[];
  subtotal: number;
  deliveryPrice: number;
  status: number;
}

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, setLoggedIn, setCart, setUser } = useStoreContext();

  useEffect(() => {
    fetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (user?.Role != "Admin") {
    setLoggedIn(false);
    localStorage.removeItem("user");
    setCart(null);
    setUser(null);
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!id) {
    return (
      <div className="text-gray-900 dark:text-gray-300">Invalid order ID</div>
    );
  }

  async function fetchOrderDetails() {
    setIsLoading(true);
    try {
      const fetchedOrder = await apiConnector.Orders.detailsForAdmin(id!);
      setOrder(fetchedOrder);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch order details");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  function getStatusName(status: number) {
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
  }

  function onStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = parseInt(e.target.value);

    apiConnector.Orders.updateStatus(id!, newStatus).then(() => {
      setOrder((prev) => {
        if (prev) {
          return { ...prev, status: newStatus };
        }
        return prev;
      });
    });
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <Link to="/admin/orders" className="text-blue-600 hover:text-blue-900">
          <ArrowLeft size={24} className="inline" /> Back to Orders
        </Link>
        <h2 className="text-2xl font-semibold leading-tight">Order Details</h2>
        <div className="mt-4">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Customer Email:</strong> {order.userEmail}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {getStatusName(order.status)}
          </p>
          <p>
            <strong>Subtotal:</strong> ${order.subtotal.toFixed(2)}
          </p>
          <p>
            <strong>Delivery Price:</strong> ${order.deliveryPrice.toFixed(2)}
          </p>
          <p>
            <strong>Total:</strong> $
            {(order.subtotal + order.deliveryPrice).toFixed(2)}
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Shipping Address</h3>
          {order.shipToAddress.fullName && (
            <p>{order.shipToAddress.fullName}</p>
          )}
          {order.shipToAddress.address1 && (
            <p>{order.shipToAddress.address1}</p>
          )}
          {order.shipToAddress.address2 && (
            <p>{order.shipToAddress.address2}</p>
          )}
          <p>
            {order.shipToAddress.city}
            {order.shipToAddress.state && `, ${order.shipToAddress.state}`}{" "}
            {order.shipToAddress.postCode}
          </p>
          <p>{order.shipToAddress.country}</p>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Change Status</h3>
          <select
            value={order.status}
            onChange={onStatusChange}
            className="mt-2 px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="0">Pending</option>
            <option value="1">Received</option>
            <option value="2">Failed</option>
            <option value="3">Shipped</option>
            <option value="4">Delivered</option>
          </select>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold">Order Items</h3>
          <table className="min-w-full leading-normal mt-4">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src={item.itemOrdered.pictureUrl}
                          alt={item.itemOrdered.name}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.itemOrdered.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {item.quantity}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
