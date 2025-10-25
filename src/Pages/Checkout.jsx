import React, { useContext, useState } from 'react';
import './CSS/Checkout.css';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { getTotalCartAmount, all_products, cartItems, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    paymentMethod: 'cash'
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the order to a backend
    console.log('Order submitted:', { formData, cartItems });
    setOrderPlaced(true);
    
    // Clear cart after 2 seconds and redirect
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  const cartProducts = all_products.filter(product => cartItems[product.id] > 0);
  const subtotal = getTotalCartAmount();
  const shippingFee = subtotal > 0 ? 10 : 0;
  const total = subtotal + shippingFee;

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. You will be redirected shortly...</p>
        </div>
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart before checking out</p>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Zip Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="cash">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <button type="submit" className="checkout-submit-btn">
              Place Order
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-products">
            {cartProducts.map((product) => (
              <div key={product.id} className="summary-product">
                <img src={product.image} alt={product.name} />
                <div className="summary-product-details">
                  <p className="summary-product-name">{product.name}</p>
                  <p className="summary-product-price">
                    ${product.new_price} x {cartItems[product.id]}
                  </p>
                </div>
                <p className="summary-product-total">
                  ${(product.new_price * cartItems[product.id]).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>${shippingFee.toFixed(2)}</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
