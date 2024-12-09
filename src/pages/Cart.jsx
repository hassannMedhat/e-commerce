/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { currency, cartItems, updateQuantity, removeFromCart, products, currentUser, getCartAmount, clearCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [delivery_fee, setDeliveryFee] = useState(0);
  const navigate = useNavigate(); // تأكد من تعريف navigate هنا

  useEffect(() => {
    if (!products || products.length === 0) return;

    const tempData = [];
    for (const items in cartItems) {
      const product = products.find(p => String(p.id) === String(items));
      if (!product) continue;

      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            id: items,
            size: item,
            quantity: cartItems[items][item],
            product: product
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1; // Set minimum quantity to 1
    }
    updateQuantity(productId, size, newQuantity); // Update quantity
  };

  const handleRemoveItem = (productId, size) => {
    removeFromCart(productId, size);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      items: cartData.map(item => ({
        productId: item.id,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price,
      })),
      shippingFee: delivery_fee,
      totalAmount: getCartAmount() + delivery_fee,
    };

    navigate('/place-order', { state: { orderData } }); // Pass order data to Place Order page
  };

  if (!products || products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-t pt-14 animate__animated animate__fadeIn">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="space-y-4">
        {cartData.map(({ id, size, quantity, product }) => (
          <div 
            key={`${id}-${size}`} 
            className="flex items-center gap-4 border-b pb-4"
          >
            {/* صورة المنتج */}
            <div className="w-20 h-20">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* تفاصيل المنتج */}
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-gray-500 text-sm">Size: {size}</p>
              <p className="font-medium">{product.price} {currency}</p>
            </div>

            {/* التحكم بالكمية */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleQuantityChange(id, size, quantity - 1)}
                className="w-8 h-8 flex items-center justify-center border"
              >
                -
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(id, size, quantity + 1)}
                className="w-8 h-8 flex items-center justify-center border"
              >
                +
              </button>
            </div>

            {/* زر الحذف */}
            <button 
              onClick={() => handleRemoveItem(id, size)}
              className="text-gray-400 hover:text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button 
              onClick={handlePlaceOrder} 
              className={`bg-black text-white text-sm my-8 px-8 py-3 ${cartData.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={cartData.length === 0}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
