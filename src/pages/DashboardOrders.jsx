import { useState, useEffect } from 'react';
import Title from '../components/Title';

const DashboardOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:6000/orders');
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-8">
        <Title text1={'DASHBOARD'} text2={'ORDERS'} />
      </div>
      <div className="flex">
        <div className="w-2/3 pr-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Customer Name</th>
                  <th className="py-3 px-4 text-left">Total Amount</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOrderClick(order)}
                  >
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.name}</td>
                    <td className="py-3 px-4">{order.totalAmount} EGP</td>
                    <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-1/3 pl-4">
          {selectedOrder && (
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-4">Order Details</h3>
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>Customer:</strong> {selectedOrder.name}</p>
              <p><strong>Total Amount:</strong> {selectedOrder.totalAmount} EGP</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
              <h4 className="font-semibold mt-4 mb-2">Shipping Details:</h4>
              <p>{selectedOrder.shippingDetails.street}</p>
              <p>{selectedOrder.shippingDetails.city} </p>
              <p>{selectedOrder.shippingDetails.country}</p>
              <h4 className="font-semibold mt-4 mb-2">Items:</h4>
              <ul>
                {Object.entries(selectedOrder.items).map(([itemId, details]) => (
                  <li key={itemId}>
                    {itemId}: 
                    {Object.entries(details).map(([size, quantity]) => (
                      ` ${size}: ${quantity}`
                    )).join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOrders;
