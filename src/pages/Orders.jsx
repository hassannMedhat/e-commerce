import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { currentUser } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:6000/orders`);
        const data = await response.json();
        const userOrders = data.filter(order => order.customerName === currentUser.name);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white shadow-md rounded p-5">
              <h2 className="text-xl font-semibold">Order #{order.id}</h2>
              <p><strong>Name:</strong> {order.customerName}</p>
              <p><strong>Phone:</strong> {order.customerPhone}</p>
              <h3 className="font-medium">Items:</h3>
              <ul>
                {order.items.map(item => (
                  <li key={item.productId}>
                    {item.quantity} x {item.size} - {item.price} EGP
                  </li>
                ))}
              </ul>
              <p><strong>Shipping Fee:</strong> {order.shippingFee} EGP</p>
              <p><strong>Total Amount:</strong> {order.totalAmount} EGP</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
