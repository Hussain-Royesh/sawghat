import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { toast } from 'react-hot-toast';
import { 
  CreditCard, 
  Smartphone, 
  Truck, 
  Building, 
  CheckCircle,
  ArrowLeft,
  ShieldCheck,
  Clock,
  MapPin
} from 'lucide-react';
import './CSS/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    getTotalCartAmount, 
    user, 
    isAuthenticated 
  } = useContext(ShopContext);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Bangladesh',
    phone: ''
  });
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!cart || cart.items.length === 0) {
      navigate('/cart');
      return;
    }

    // Pre-fill address if user has addresses
    if (user?.addresses && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
      setDeliveryAddress(defaultAddress);
    }
  }, [isAuthenticated, cart, navigate, user]);

  const paymentMethods = [
    {
      id: 'bkash',
      name: 'bKash',
      description: 'Pay securely with bKash mobile wallet',
      icon: <Smartphone className="payment-icon bkash" />,
      fee: '1.8%',
      processingTime: 'Instant',
      available: true
    },
    {
      id: 'nagad',
      name: 'Nagad',
      description: 'Pay with Nagad mobile financial service',
      icon: <Smartphone className="payment-icon nagad" />,
      fee: '1.5%',
      processingTime: 'Instant',
      available: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay with Visa, MasterCard, or local cards',
      icon: <CreditCard className="payment-icon card" />,
      fee: '2.5%',
      processingTime: 'Instant',
      available: true
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when your order is delivered',
      icon: <Truck className="payment-icon cod" />,
      fee: '৳50',
      processingTime: '3-5 days',
      available: true
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      description: 'Transfer directly to our bank account',
      icon: <Building className="payment-icon bank" />,
      fee: '৳25',
      processingTime: '1-2 days',
      available: true
    }
  ];

  const calculateFees = (method, amount) => {
    const feeRates = {
      bkash: { rate: 0.018, min: 5, max: 200 },
      nagad: { rate: 0.015, min: 3, max: 150 },
      card: { rate: 0.025, min: 10, max: 500 },
      cod: { flat: 50 },
      bank_transfer: { flat: 25 }
    };

    if (!feeRates[method]) return 0;

    if (feeRates[method].rate) {
      return Math.max(
        Math.min(amount * feeRates[method].rate, feeRates[method].max || Infinity),
        feeRates[method].min || 0
      );
    } else {
      return feeRates[method].flat || 0;
    }
  };

  const handleAddressChange = (field, value) => {
    setDeliveryAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateAddress = () => {
    const required = ['street', 'city', 'state', 'zipCode', 'phone'];
    return required.every(field => deliveryAddress[field]?.trim());
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (!validateAddress()) {
      toast.error('Please fill in all delivery address fields');
      setShowAddressForm(true);
      return;
    }

    setProcessing(true);

    try {
      // First create the order
      const orderResponse = await fetch('http://localhost:4001/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          shippingAddress: deliveryAddress,
          specialInstructions: specialInstructions
        })
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      // Then initiate payment
      const paymentResponse = await fetch('http://localhost:4001/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          orderId: orderData.order._id,
          paymentMethod: selectedPaymentMethod,
          deliveryAddress: deliveryAddress,
          specialInstructions: specialInstructions
        })
      });

      const paymentData = await paymentResponse.json();

      if (paymentData.success) {
        const payment = paymentData.payment;

        if (selectedPaymentMethod === 'cod') {
          toast.success('Order placed successfully! You can pay on delivery.');
          navigate('/order-success', { 
            state: { 
              orderId: orderData.order._id, 
              paymentMethod: 'cod' 
            } 
          });
        } else if (selectedPaymentMethod === 'bank_transfer') {
          navigate('/payment-instructions', { 
            state: { 
              payment,
              bankDetails: paymentData.payment.gatewayResponse.bankDetails
            } 
          });
        } else {
          // Redirect to gateway URL for online payments
          const gatewayUrl = paymentData.payment.gatewayResponse.bkashURL || 
                           paymentData.payment.gatewayResponse.paymentUrl || 
                           paymentData.payment.gatewayResponse.gatewayPageURL;
          
          if (gatewayUrl) {
            window.location.href = gatewayUrl;
          } else {
            // Handle in-app payment flow
            navigate('/payment-process', { 
              state: { 
                payment,
                paymentMethod: selectedPaymentMethod 
              } 
            });
          }
        }
      } else {
        throw new Error(paymentData.message || 'Payment initiation failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const subtotal = getTotalCartAmount();
  const selectedMethod = paymentMethods.find(m => m.id === selectedPaymentMethod);
  const fee = selectedPaymentMethod ? calculateFees(selectedPaymentMethod, subtotal) : 0;
  const total = subtotal + fee;

  if (!isAuthenticated || !cart) {
    return <div className="checkout-loading">Loading...</div>;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button onClick={() => navigate('/cart')} className="back-btn">
          <ArrowLeft size={20} />
          Back to Cart
        </button>
        <h1>Checkout</h1>
        <div className="security-badge">
          <ShieldCheck size={16} />
          Secure Checkout
        </div>
      </div>

      <div className="checkout-content">
        {/* Left Column - Forms */}
        <div className="checkout-left">
          {/* Payment Methods */}
          <div className="checkout-section">
            <h2>Payment Method</h2>
            <div className="payment-methods">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`payment-method ${selectedPaymentMethod === method.id ? 'selected' : ''} ${!method.available ? 'disabled' : ''}`}
                  onClick={() => method.available && setSelectedPaymentMethod(method.id)}
                >
                  <div className="payment-method-header">
                    {method.icon}
                    <div className="payment-method-info">
                      <h3>{method.name}</h3>
                      <p>{method.description}</p>
                    </div>
                    <div className="payment-method-details">
                      <span className="fee">Fee: {method.fee}</span>
                      <span className="time">
                        <Clock size={12} />
                        {method.processingTime}
                      </span>
                    </div>
                  </div>
                  {selectedPaymentMethod === method.id && (
                    <div className="payment-method-selected">
                      <CheckCircle size={16} />
                      Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="checkout-section">
            <div className="section-header">
              <h2>Delivery Address</h2>
              <button 
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="toggle-address-btn"
              >
                <MapPin size={16} />
                {showAddressForm ? 'Hide' : 'Edit'} Address
              </button>
            </div>
            
            {(showAddressForm || !deliveryAddress.street) && (
              <div className="address-form">
                <div className="form-group">
                  <label>Street Address *</label>
                  <input
                    type="text"
                    value={deliveryAddress.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    placeholder="Enter your street address"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      value={deliveryAddress.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State/Division *</label>
                    <select
                      value={deliveryAddress.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                      required
                    >
                      <option value="">Select Division</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Barisal">Barisal</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>ZIP Code *</label>
                    <input
                      type="text"
                      value={deliveryAddress.zipCode}
                      onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                      placeholder="ZIP Code"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={deliveryAddress.phone}
                      onChange={(e) => handleAddressChange('phone', e.target.value)}
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {deliveryAddress.street && !showAddressForm && (
              <div className="address-preview">
                <p><strong>{deliveryAddress.street}</strong></p>
                <p>{deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode}</p>
                <p>Phone: {deliveryAddress.phone}</p>
              </div>
            )}
          </div>

          {/* Special Instructions */}
          <div className="checkout-section">
            <h2>Special Instructions (Optional)</h2>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special delivery instructions..."
              rows="3"
            />
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="checkout-right">
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="order-items">
              {cart.items.map((item) => (
                <div key={item._id} className="order-item">
                  <img src={item.product.images[0]} alt={item.product.name} />
                  <div className="order-item-details">
                    <h4>{item.product.name}</h4>
                    <p>Size: {item.size} | Color: {item.color}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="order-item-price">
                    ৳{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              {fee > 0 && (
                <div className="total-row">
                  <span>{selectedMethod?.name} Fee:</span>
                  <span>৳{fee.toFixed(2)}</span>
                </div>
              )}
              <div className="total-row shipping">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="total-row total">
                <span>Total:</span>
                <span>৳{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={!selectedPaymentMethod || processing}
              className="place-order-btn"
            >
              {processing ? (
                <>
                  <div className="spinner"></div>
                  Processing...
                </>
              ) : (
                `Place Order - ৳${total.toLocaleString()}`
              )}
            </button>

            <div className="security-notice">
              <ShieldCheck size={16} />
              <p>Your payment information is secure and encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;