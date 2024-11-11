import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';

// صورة افتراضية للمنتجات
const DEFAULT_PRODUCT_IMAGE = 'https://via.placeholder.com/150';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const { delivery_fee } = useContext(ShopContext);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const foundOrder = orders.find(o => o.id === parseInt(orderId));
    console.log("Found order:", foundOrder);
    setOrder(foundOrder);
  }, [orderId]);

  if (!order) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  // تحويل كائن items إلى مصفوفة
  const itemsArray = Object.entries(order.items).map(([key, value]) => ({
    id: key,
    ...value
  }));

  return (
    <div className="border-t pt-16 pb-8">
      <div className="text-2xl mb-8">
        <Title text1={'ORDER'} text2={'DETAILS'} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Order Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><span className="font-medium">Order ID:</span> {order.id}</p>
          <p><span className="font-medium">Date:</span> {new Date(order.date).toLocaleString()}</p>
          <p><span className="font-medium">Total Amount:</span> {order.totalAmount} EGP</p>
          <p><span className="font-medium">Status:</span> Processed</p>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Products</h3>
        <div className="space-y-4">
          {itemsArray.map((item, index) => (
            <div key={index} className="flex items-start space-x-4 border-b pb-4">
              <img 
                src={assets[`${item.id}`] || DEFAULT_PRODUCT_IMAGE}
                alt={item.id} 
                className="w-24 h-24 object-cover rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_PRODUCT_IMAGE;
                }}
              />
              <div>
                <h4 className="font-semibold text-lg mb-2">{item.id}</h4>
                {Object.entries(item).map(([size, quantity]) => (
                  size !== 'id' && (
                    <p key={size} className="text-gray-600">
                      Size: {size}, Quantity: {quantity}
                    </p>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="flex justify-between items-center border-b pb-2 mb-2">
          <span>Subtotal</span>
          <span>{order.totalAmount} EGP</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2 mb-2">
          <span>Delivery Fee</span>
          <span>{delivery_fee} EGP</span>
        </div>
        <div className="flex justify-between items-center font-semibold text-lg">
          <span>Total</span>
          <span>{order.totalAmount + delivery_fee} EGP</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
