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
  const { cartItems } = useSelector((state) => state.shopCart);
  const items = cartItems.items || []; // Access the `items` array with a fallback
  const { user } = useSelector((state) => state.auth);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [transactionHash, setTransactionHash] = useState(''); // New state for transaction hash

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // Fetch cart items when the user ID is available
  useEffect(() => {
    if (!user?.id) return;
    dispatch(fetchCartItems(user.id));
  }, [dispatch, user]);

  // Calculate total amount with salePrice support
  const totalCartAmount =
    (items || []).reduce(
      (sum, item) =>
        sum +
        (item?.salePrice > 0 ? item.salePrice : item?.price) * item?.quantity,
      0
    );

  // Update payment details based on the selected cryptocurrency
  const updatePaymentDetails = async (method) => {
    setPaymentMethod(method);
    setShowPaymentDetails(true);

    try {
      switch (method) {
        case "btc": {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
          );
          const data = await response.json();
          const btcPrice = data.bitcoin.usd;
          setCryptoAddress("1G7VHkHiDLY28pqMNTPqjU7GVoce2tEXXS");
          setConvertedAmount(`${(totalCartAmount / btcPrice).toFixed(8)} BTC`);
          break;
        }
        case "ltc": {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd"
          );
          const data = await response.json();
          const ltcPrice = data.litecoin.usd;
          setCryptoAddress("LPXGUN35hc15X3SvouXVzWifLKifjNvqUn");
          setConvertedAmount(`${(totalCartAmount / ltcPrice).toFixed(6)} LTC`);
          break;
        }
        case "usdt": {
          setCryptoAddress("TLZVUDTxWZ6L7tgYXcQqtSx29EinwjRP2w");
          setConvertedAmount(`${totalCartAmount} USDT`);
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

  // Copy the crypto address to the clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(cryptoAddress).then(() => {
      alert('Address copied to clipboard!');
    });
  };

  // Confirm the user's email address
  const confirmEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    setEmailConfirmed(true);
    alert(`Email confirmed: ${email}`);
  };

  // Confirm the order
  const confirmOrder = () => {
    if (!emailConfirmed) {
      alert('Please confirm your email before proceeding.');
      return;
    }
    if (!transactionHash) {
      alert('Please enter the transaction hash ID.');
      return;
    }
    alert(
      `Your order has been submitted. Transaction Hash: ${transactionHash}. Ensure your email is correct. Upon receiving payment, your order will be confirmed, and you will receive a notification via the email you provided.`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-5 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <header className="bg-gray-100 px-4 md:px-8 py-6 border-b border-gray-200">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
            Secure Checkout
          </h1>
          <div className="h-1 bg-gray-200 rounded-full">
            <div className="h-full bg-green-600 rounded-full w-2/3 transition-all"></div>
          </div>
        </header>

        <div className="p-4 md:p-8">
          {/* Cart Items Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 md:px-6 md:py-4 text-left text-gray-600 font-medium">Item</th>
                  <th className="px-4 py-2 md:px-6 md:py-4 text-left text-gray-600 font-medium">Product</th>
                  <th className="px-4 py-2 md:px-6 md:py-4 text-left text-gray-600 font-medium">Qty</th>
                  <th className="px-4 py-2 md:px-6 md:py-4 text-left text-gray-600 font-medium">Price</th>
                  <th className="px-4 py-2 md:px-6 md:py-4 text-left text-gray-600 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {(items || []).map((item) => (
                  <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 md:px-6 md:py-4">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-10 h-10 md:w-14 md:h-14 rounded-lg object-cover shadow-sm"
                      />
                    </td>
                    <td className="px-4 py-2 md:px-6 md:py-4 font-medium text-gray-800">{item.title}</td>
                    <td className="px-4 py-2 md:px-6 md:py-4 text-gray-600">{item.quantity}</td>
                    <td className="px-4 py-2 md:px-6 md:py-4 text-gray-600">
                      ${item.salePrice > 0 ? item.salePrice.toFixed(2) : item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 md:px-6 md:py-4 text-green-700 font-medium">
                      ${(
                        (item.salePrice > 0 ? item.salePrice : item.price) *
                        item.quantity
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-8">
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Subtotal:</span>
              <span>${totalCartAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold text-red-700">${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Payment Method</h3>
            <select
              id="payment-method"
              onChange={(e) => updatePaymentDetails(e.target.value)}
              className="w-full p-3 md:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="" disabled selected>Choose Cryptocurrency</option>
              <option value="btc">Bitcoin (BTC)</option>
              <option value="ltc">Litecoin (LTC)</option>
              <option value="usdt">USDT (TRC-20)</option>
            </select>
          </div>

          {/* Payment Details */}
          {showPaymentDetails && (
            <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 mt-6">
              <div className="flex items-center mb-6">
                <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold mr-3">
                  {paymentMethod.toUpperCase()}
                </span>
                <h3 className="text-xl font-semibold text-gray-800">Crypto Payment Details</h3>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
                <img
                  src={paymentMethod === 'btc' ? btcQR : paymentMethod === 'ltc' ? ltcQR : usdtQR}
                  alt="QR Code"
                  className="w-32 h-32 md:w-48 md:h-48 rounded-xl border border-gray-200 p-2 bg-white"
                />
                <div className="flex-1 w-full">
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <p className="font-mono text-sm break-all text-gray-800">
                      {cryptoAddress}
                    </p>
                  </div>
                  <button 
                    onClick={copyAddress}
                    className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Copy Address
                  </button>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-green-700 font-medium">
                  Amount: <strong>{convertedAmount}</strong>
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Conversion rate updates every 5 minutes. Send exact amount to avoid delays.
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="email"
                  id="user-email"
                  placeholder="Enter your email for payment confirmation"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 md:p-4 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={emailConfirmed}
                />
                <input
                  type="text"
                  id="transaction-hash"
                  placeholder="Enter transaction hash ID"
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  className="w-full p-3 md:p-4 border border-gray-300 rounded-lg"
                />
                {!emailConfirmed ? (
                  <button 
                    onClick={confirmEmail}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Confirm Email
                  </button>
                ) : (
                  <button 
                    onClick={confirmOrder}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
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