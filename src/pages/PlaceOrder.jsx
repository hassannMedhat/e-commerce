import { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';
import CreditCard from '../components/CreditCard';


const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { getCartAmount, cartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    country: '',
    phone: ''
  });
  const [showVisaPopup, setShowVisaPopup] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardName, setCardName] = useState('');
  const [cvc, setCvc] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    // Validate form data
    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'country', 'phone'];
    const emptyFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');

    if (emptyFields.length > 0) {
      toast.error(`Please fill the following fields: ${emptyFields.join(', ')}`);
      return;
    }

    // Create new order
    const newOrder = {
      name: `${formData.firstName} ${formData.lastName}`,
      totalAmount: getCartAmount(),
      items: cartItems,
      date: new Date().toISOString(),
      shippingDetails: formData,
      paymentMethod: method
    };

    // Send new order to the API
    try {
      const response = await fetch('http://localhost:6000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      // Optionally, you can handle the response here if needed
    } catch (error) {
      toast.error('Error placing order: ' + error.message);
      return;
    }

    // Set orderSuccess in sessionStorage
    sessionStorage.setItem('orderSuccess', 'true');

    navigate('/orders');
  };

  const handleSaveVisaCard = () => {
    // التحقق من جميع الحقول
    if (!cardNumber || !cardName || !expiryDate || !cvc) {
      toast.error('Please fill in all card details.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // التحقق من صحة رقم البطاقة (يجب أن يكون 16 رقمًا)
    if (cardNumber.length !== 16) {
      toast.error('Card number must be 16 digits.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // التحقق من صحة تاريخ انتهاء الصلاحية (يجب أن يكون بتنسيق MM/YY)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      toast.error('Expiry date must be in MM/YY format.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // التحقق من صحة CVC (يجب أن يكون 3 أرقام)
    if (cvc.length !== 3) {
      toast.error('CVC must be 3 digits.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // إذا تم اجتياز جميع التحققات، قم بحفظ بيانات البطاقة
    setMethod('visa');
    setShowVisaPopup(false);
    toast.success('Visa card details saved successfully!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleCloseVisaPopup = () => {
    setShowVisaPopup(false);
    setMethod('cod');  // This will set the payment method back to 'cod'
  };

  const handleExpiryDateChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    if (input.length <= 2) {
      setExpiryDate(input);
    } else {
      setExpiryDate(`${input.slice(0, 2)}/${input.slice(2, 4)}`);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        {/* Form inputs */}
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" name="email" value={formData.email} onChange={handleInputChange} />
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" name="street" value={formData.street} onChange={handleInputChange} />
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" name="city" value={formData.city} onChange={handleInputChange} />
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" name="country" value={formData.country} onChange={handleInputChange} />
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="tel" placeholder="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
      </div>
      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment Method Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => {
              setMethod('visa');
              setShowVisaPopup(true);
            }} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'visa' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.visa_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button onClick={handlePlaceOrder} className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
        </div>
      </div>

      {/* Visa Popup */}
      {showVisaPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-[400px] shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold border-b pb-2">Card Details</h2>
            </div>
            <CreditCard
              cardNumber={cardNumber}
              expiryDate={expiryDate}
              cvc={cvc}
              name={cardName}
              isInputFocused={focusedInput}
            />
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                <input
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  maxLength={16}
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                  onFocus={() => setFocusedInput('number')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card holder name</label>
                <input
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="FULL NAME"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry date</label>
                  <input 
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    type="text" 
                    placeholder="MM/YY" 
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    maxLength={5}
                    onFocus={() => setFocusedInput('expiry')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                    maxLength={3}
                    onFocus={() => setFocusedInput('cvc')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button onClick={handleCloseVisaPopup} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150">
                Close
              </button>
              <button onClick={handleSaveVisaCard} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaceOrder;
