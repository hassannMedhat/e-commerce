import Title from "../components/Title";
import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount(); // Get subtotal
  const total = subtotal + delivery_fee; // Calculate total

  // Log values to check
  useEffect(() => {
    console.log("Subtotal:", subtotal);
    console.log("Delivery Fee:", delivery_fee);
    console.log("Total:", total);
  }, [subtotal, delivery_fee, total]);

  return (
    <div className="w-full">
      <div className="text-2xl mb-4">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Subtotal</p>
          <p>{subtotal ? subtotal.toFixed(2) : '0.00'} {currency}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Shipping Fee</p>
          <p>{delivery_fee ? delivery_fee.toFixed(2) : '0.00'} {currency}</p>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <p className="font-medium">Total</p>
          <p className="font-medium">{total ? total.toFixed(2) : '0.00'} {currency}</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
