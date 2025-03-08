import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCartItems } from '../../store/shop/cart-slice'; 
import btcQR from "../../assets/crypto/btc.jpg";
import usdtQR from "../../assets/crypto/usdt.jpg";
import ltcQR from "../../assets/crypto/ltc.jpg";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth); 
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch cart items when the component mounts
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Update payment details based on selected method
  const updatePaymentDetails = async (method) => {
    setPaymentMethod(method);
    setShowPaymentDetails(true);
  
    try {
      switch (method) {
        case "btc": {
          // Fetch live BTC price in USD from CoinGecko
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
          );
          const data = await response.json();
          const btcPrice = data.bitcoin.usd;
          setCryptoAddress("1G7VHkHiDLY28pqMNTPqjU7GVoce2tEXXS");
          setConvertedAmount(`${(totalAmount / btcPrice).toFixed(8)} BTC`);
          break;
        }
        case "ltc": {
          // Fetch live LTC price in USD from CoinGecko
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd"
          );
          const data = await response.json();
          const ltcPrice = data.litecoin.usd;
          setCryptoAddress("LPXGUN35hc15X3SvouXVzWifLKifjNvqUn");
          setConvertedAmount(`${(totalAmount / ltcPrice).toFixed(8)} LTC`);
          break;
        }
        case "usdt": {
          // USDT is pegged to USD so no conversion is needed.
          setCryptoAddress("TLZVUDTxWZ6L7tgYXcQqtSx29EinwjRP2w");
          setConvertedAmount(`${totalAmount} USDT`);
          break;
        }
        default: {
          setCryptoAddress("");
          setConvertedAmount("");
        }
      }
    } catch (error) {
      console.error("Error updating payment details:", error);
    }
  };

  // Copy crypto address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(cryptoAddress).then(() => {
      alert('Address copied to clipboard!');
    });
  };

  // Confirm email
  const confirmEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    setEmailConfirmed(true);
    alert(`Email confirmed: ${email}`);
  };

  // Confirm order
  const confirmOrder = () => {
    if (!emailConfirmed) {
      alert('Please confirm your email before proceeding.');
      return;
    }
    alert(
      `Your order has been submitted. Upon receiving payment, your order will be confirmed, and you will receive a notification via the email you provided.`
    );
    const orderDetails = {
      cartItems,
      totalAmount,
      paymentMethod,
      cryptoAddress,
      convertedAmount,
      email,
    };
    // sendOrderToBackend(orderDetails);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <header className="p-8 bg-gray-100 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900 text-center">Secure Checkout</h1>
          <div className="h-1 bg-green-600 mt-4 rounded-full" style={{ width: '66%' }}></div>
        </header>

        <div className="p-8">
          {/* Cart Items Table */}
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img className="w-14 h-14 rounded-md object-cover" src={item.image} alt={item.title} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">{item.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Subtotal:</span>
              <span className="text-gray-700">${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Shipping:</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="font-semibold text-red-600">Total:</span>
              <span className="font-semibold text-red-600">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-indigo-900 mb-4">Select Payment Method</h3>
            <select
              onChange={(e) => updatePaymentDetails(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="" disabled selected>
                Choose Cryptocurrency
              </option>
              <option value="btc">Bitcoin (BTC)</option>
              <option value="ltc">Litecoin (LTC)</option>
              <option value="usdt">USDT (ERC-20)</option>
            </select>
          </div>

          {/* Crypto Payment Details */}
          {showPaymentDetails && (
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center mb-6">
                <span className="bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full mr-4">
                  {paymentMethod.toUpperCase()}
                </span>
                <h3 className="text-xl font-semibold text-indigo-900">Crypto Payment Details</h3>
              </div>

              <div className="flex items-center gap-8 mb-6">
                <img
                  className="w-44 h-44 rounded-lg border p-2"
                  src={
                    paymentMethod === 'btc'
                      ? btcQR
                      : paymentMethod === 'ltc'
                      ? ltcQR
                      : usdtQR
                  }
                  alt="QR Code"
                />
                <div className="flex-1">
                  <p className="bg-gray-100 p-4 rounded-lg font-mono text-sm text-gray-700 break-words">
                    {cryptoAddress}
                  </p>
                  <button onClick={copyAddress} className="mt-4 w-full px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-700">
                    Copy Address
                  </button>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-green-600 font-semibold">
                  Amount: <span className="font-bold">{convertedAmount}</span>
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Conversion rate updates every 5 minutes. Send exact amount to avoid delays.
                </p>
              </div>

              <div className="mb-6">
                <input
                  type="email"
                  placeholder="Enter your email for payment confirmation"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  disabled={emailConfirmed}
                />
                {!emailConfirmed ? (
                  <button onClick={confirmEmail} className="mt-4 w-full px-4 py-3 bg-indigo-900 text-white rounded-lg hover:bg-indigo-700">
                    Confirm Email
                  </button>
                ) : (
                  <button onClick={confirmOrder} className="mt-4 w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Confirm Payment
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
