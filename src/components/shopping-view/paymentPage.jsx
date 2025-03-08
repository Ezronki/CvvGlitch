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
  const { user } = useSelector((state) => state.auth); // Get user from Redux auth state
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [email, setEmail] = useState(user?.email || ''); // Default to logged-in user's email
  const [emailConfirmed, setEmailConfirmed] = useState(false); // Track email confirmation

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
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
        case "eth": {
          // Fetch live LTC price in USD from CoinGecko
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd"
          );
          const data = await response.json();
          const ltcPrice = data.litecoin.usd;
          // Replace with your actual Litecoin address
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

    setEmailConfirmed(true); // Mark email as confirmed
    alert(`Email confirmed: ${email}`);
  };

  // Confirm order
  const confirmOrder = () => {
    if (!emailConfirmed) {
      alert('Please confirm your email before proceeding.');
      return;
    }

    alert(
      `Your order has been submitted. Ensure your email is correct. Upon receiving payment, your order will be confirmed, and you will receive a notification via the email you provided.`
    );

    // Here you can add logic to send the order details to your backend
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
    <div style={styles.container}>
      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.title}>Secure Checkout</h1>
          <div style={styles.progressBar}>
            <div style={styles.progressFill}></div>
          </div>
        </header>

        <div style={styles.paymentContainer}>
          {/* Cart Items Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Item</th>
                  <th style={styles.tableHeader}>Product</th>
                  <th style={styles.tableHeader}>Qty</th>
                  <th style={styles.tableHeader}>Price</th>
                  <th style={styles.tableHeader}>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={styles.productImage} 
                      />
                    </td>
                    <td style={{ ...styles.tableCell, fontWeight: 500 }}>{item.title}</td>
                    <td style={styles.tableCell}>{item.quantity}</td>
                    <td style={styles.tableCell}>${item.price.toFixed(2)}</td>
                    <td style={{ ...styles.tableCell, color: '#2e7d32' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payment Summary */}
          <div style={styles.summaryCard}>
            <div style={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping:</span>
              <span style={{ color: '#2e7d32' }}>FREE</span>
            </div>
            <div style={{ ...styles.summaryRow, borderTop: '1px solid #eee', paddingTop: 12 }}>
              <span style={{ fontWeight: 600 }}>Total:</span>
              <span style={{ fontWeight: 600, color: '#d32f2f' }}>
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div style={styles.paymentMethodCard}>
            <h3 style={styles.sectionTitle}>Select Payment Method</h3>
            <select
              id="payment-method"
              onChange={(e) => updatePaymentDetails(e.target.value)}
              style={styles.select}
            >
              <option value="" disabled selected>Choose Cryptocurrency</option>
              <option value="btc">Bitcoin (BTC)</option>
              <option value="eth">Litecoin (ETH)</option>
              <option value="usdt">USDT (ERC-20)</option>
            </select>
          </div>

          {/* Crypto Payment Details */}
          {showPaymentDetails && (
            <div style={styles.cryptoCard}>
              <div style={styles.cryptoHeader}>
                <span style={styles.cryptoBadge}>{paymentMethod.toUpperCase()}</span>
                <h3 style={styles.sectionTitle}>Crypto Payment Details</h3>
              </div>

              <div style={styles.qrSection}>
                <img
                  src={paymentMethod === 'btc' ? btcQR : paymentMethod === 'eth' ? ltcQR : usdtQR}
                  alt="QR Code"
                  style={styles.qrCode}
                />
                <div style={styles.addressSection}>
                  <p style={styles.cryptoAddress}>{cryptoAddress}</p>
                  <button onClick={copyAddress} style={styles.copyButton}>
                    Copy Address
                  </button>
                </div>
              </div>

              <div style={styles.conversionSection}>
                <p style={styles.conversionText}>
                  Amount: <strong>{convertedAmount}</strong>
                </p>
                <p style={styles.note}>
                  Conversion rate updates every 5 minutes. Send exact amount to avoid delays.
                </p>
              </div>

              <div style={styles.emailSection}>
                <input
                  type="email"
                  id="user-email"
                  placeholder="Enter your email for payment confirmation"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.emailInput}
                  disabled={emailConfirmed}
                />
                {!emailConfirmed && (
                  <button onClick={confirmEmail} style={styles.confirmEmailButton}>
                    Confirm Email
                  </button>
                )}
                {emailConfirmed && (
                  <button onClick={confirmOrder} style={styles.confirmButton}>
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

// Styles
const styles = {
  container: {
    backgroundColor: '#fafafa',
    minHeight: '100vh',
    padding: '32px 16px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  header: {
    padding: '32px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #eee',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    color: '#1a237e',
    fontWeight: 600,
    textAlign: 'center',
  },
  progressBar: {
    height: '4px',
    backgroundColor: '#eee',
    borderRadius: '2px',
    marginTop: '16px',
  },
  progressFill: {
    width: '66%',
    height: '100%',
    backgroundColor: '#2e7d32',
    borderRadius: '2px',
    transition: 'width 0.3s ease',
  },
  paymentContainer: {
    padding: '32px',
  },
  tableContainer: {
    overflowX: 'auto',
    marginBottom: '32px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    padding: '16px',
    backgroundColor: '#f8f9fa',
    color: '#616161',
    fontWeight: 500,
    textAlign: 'left',
    borderBottom: '2px solid #eee',
  },
  tableRow: {
    borderBottom: '1px solid #eee',
    ':hover': {
      backgroundColor: '#f8f9fa',
    },
  },
  tableCell: {
    padding: '16px',
    color: '#424242',
  },
  productImage: {
    width: '56px',
    height: '56px',
    borderRadius: '8px',
    objectFit: 'cover',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  summaryCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '32px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    color: '#616161',
  },
  paymentMethodCard: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '20px',
    color: '#1a237e',
    margin: '0 0 16px 0',
  },
  select: {
    width: '100%',
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    fontSize: '16px',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;utf8,<svg ...></svg>")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    transition: 'border-color 0.2s ease',
    ':focus': {
      outline: 'none',
      borderColor: '#2e7d32',
      boxShadow: '0 0 0 2px rgba(46,125,50,0.2)',
    },
  },
  cryptoCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
    padding: '24px',
    marginTop: '24px',
  },
  cryptoHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
  },
  cryptoBadge: {
    backgroundColor: '#2e7d32',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
    marginRight: '12px',
  },
  qrSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    marginBottom: '24px',
  },
  qrCode: {
    width: '180px',
    height: '180px',
    borderRadius: '12px',
    border: '1px solid #eee',
    padding: '8px',
    backgroundColor: '#fff',
  },
  addressSection: {
    flex: 1,
  },
  cryptoAddress: {
    backgroundColor: '#f8f9fa',
    padding: '16px',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#424242',
    margin: '16px 0',
    wordBreak: 'break-all',
  },
  copyButton: {
    padding: '10px 20px',
    backgroundColor: '#1a237e',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#303f9f',
    },
  },
  conversionSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '16px',
    margin: '24px 0',
  },
  conversionText: {
    margin: 0,
    color: '#2e7d32',
    fontWeight: 500,
    fontSize: '18px',
  },
  note: {
    margin: '8px 0 0 0',
    color: '#757575',
    fontSize: '14px',
  },
  emailSection: {
    marginTop: '24px',
  },
  emailInput: {
    width: '100%',
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    marginBottom: '16px',
    fontSize: '16px',
    transition: 'border-color 0.2s ease',
    ':focus': {
      outline: 'none',
      borderColor: '#2e7d32',
      boxShadow: '0 0 0 2px rgba(46,125,50,0.2)',
    },
  },
  confirmEmailButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1a237e',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#303f9f',
    },
  },
  confirmButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#2e7d32',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#1b5e20',
    },
  },
};

export default PaymentPage;