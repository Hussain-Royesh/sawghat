import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import './CSS/PaymentResult.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('orderId');
  const paymentId = searchParams.get('paymentId');

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`http://localhost:4001/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="payment-result-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-result-container">
      <div className="payment-result-card success">
        {/* Success Icon */}
        <div className="result-icon success">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>

        {/* Success Message */}
        <h1>Payment Successful!</h1>
        <p className="result-message">
          Your payment has been processed successfully. Your order is now being prepared.
        </p>

        {/* Order Details */}
        {orderDetails && (
          <div className="order-details-card">
            <h2>Order Details</h2>
            <div className="order-info">
              <div className="info-row">
                <span className="label">Order ID:</span>
                <span className="value">{orderDetails._id}</span>
              </div>
              <div className="info-row">
                <span className="label">Payment ID:</span>
                <span className="value">{paymentId}</span>
              </div>
              <div className="info-row">
                <span className="label">Total Amount:</span>
                <span className="value amount">{formatCurrency(orderDetails.totalAmount)}</span>
              </div>
              <div className="info-row">
                <span className="label">Payment Method:</span>
                <span className="value capitalize">{orderDetails.paymentMethod}</span>
              </div>
              <div className="info-row">
                <span className="label">Order Date:</span>
                <span className="value">{new Date(orderDetails.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="next-steps">
          <h3>What happens next?</h3>
          <div className="steps-list">
            <div className="step">
              <div className="step-number">1</div>
              <p>Order confirmation email sent</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <p>Your order is being prepared</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <p>You'll receive shipping updates</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Link to="/orders" className="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
            View My Orders
          </Link>
          <Link to="/" className="btn btn-secondary">
            Continue Shopping
          </Link>
        </div>

        {/* Support */}
        <div className="support-section">
          <p>Need help? <a href="/contact">Contact our support team</a></p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;