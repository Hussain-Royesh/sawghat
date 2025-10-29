import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import './CSS/PaymentResult.css';

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [retryCount, setRetryCount] = useState(0);

  const error = searchParams.get('error');
  const orderId = searchParams.get('orderId');
  const paymentId = searchParams.get('paymentId');

  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      'insufficient_funds': 'Insufficient funds in your account. Please add money and try again.',
      'transaction_declined': 'Your transaction was declined by the payment provider.',
      'network_error': 'Network connection issue. Please check your internet and try again.',
      'payment_timeout': 'Payment session expired. Please try again.',
      'invalid_credentials': 'Invalid payment credentials. Please check your account details.',
      'service_unavailable': 'Payment service is temporarily unavailable. Please try again later.',
      'cancelled_by_user': 'Payment was cancelled by you.',
      'card_expired': 'Your card has expired. Please use a different card.',
      'card_blocked': 'Your card is blocked. Please contact your bank.',
      'invalid_amount': 'Invalid payment amount. Please contact support.',
      'daily_limit_exceeded': 'Daily transaction limit exceeded. Please try again tomorrow.',
      'monthly_limit_exceeded': 'Monthly transaction limit exceeded.',
      'duplicate_transaction': 'Duplicate transaction detected. Please wait and try again.',
      'maintenance': 'Payment gateway is under maintenance. Please try again later.',
      'unknown_error': 'An unexpected error occurred. Please try again or contact support.'
    };

    return errorMessages[errorCode] || errorMessages['unknown_error'];
  };

  const getErrorTitle = (errorCode) => {
    const criticalErrors = ['card_blocked', 'card_expired', 'daily_limit_exceeded', 'monthly_limit_exceeded'];
    const temporaryErrors = ['network_error', 'service_unavailable', 'maintenance', 'payment_timeout'];
    
    if (criticalErrors.includes(errorCode)) {
      return 'Payment Method Issue';
    } else if (temporaryErrors.includes(errorCode)) {
      return 'Temporary Issue';
    } else {
      return 'Payment Failed';
    }
  };

  const canRetry = (errorCode) => {
    const noRetryErrors = ['card_expired', 'card_blocked', 'daily_limit_exceeded', 'monthly_limit_exceeded', 'cancelled_by_user'];
    return !noRetryErrors.includes(errorCode) && retryCount < 3;
  };

  const handleRetryPayment = () => {
    setRetryCount(prev => prev + 1);
    // Navigate back to checkout with order data
    navigate('/checkout', { 
      state: { 
        retryOrderId: orderId,
        retryAttempt: retryCount + 1 
      } 
    });
  };

  return (
    <div className="payment-result-container">
      <div className="payment-result-card failure">
        {/* Failure Icon */}
        <div className="result-icon failure">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="m15 9-6 6" stroke="currentColor" strokeWidth="2"/>
            <path d="m9 9 6 6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>

        {/* Error Message */}
        <h1>{getErrorTitle(error)}</h1>
        <p className="result-message">
          {getErrorMessage(error)}
        </p>

        {/* Error Details */}
        <div className="error-details-card">
          <h3>Transaction Details</h3>
          <div className="error-info">
            {orderId && (
              <div className="info-row">
                <span className="label">Order ID:</span>
                <span className="value">{orderId}</span>
              </div>
            )}
            {paymentId && (
              <div className="info-row">
                <span className="label">Payment ID:</span>
                <span className="value">{paymentId}</span>
              </div>
            )}
            <div className="info-row">
              <span className="label">Error Code:</span>
              <span className="value error-code">{error || 'unknown_error'}</span>
            </div>
            <div className="info-row">
              <span className="label">Time:</span>
              <span className="value">{new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
            {retryCount > 0 && (
              <div className="info-row">
                <span className="label">Retry Attempts:</span>
                <span className="value">{retryCount}</span>
              </div>
            )}
          </div>
        </div>

        {/* Troubleshooting Tips */}
        <div className="troubleshooting">
          <h3>Troubleshooting Tips</h3>
          <div className="tips-list">
            <div className="tip">
              <div className="tip-icon">💳</div>
              <p>Check your account balance or card validity</p>
            </div>
            <div className="tip">
              <div className="tip-icon">📶</div>
              <p>Ensure stable internet connection</p>
            </div>
            <div className="tip">
              <div className="tip-icon">🔄</div>
              <p>Try a different payment method</p>
            </div>
            <div className="tip">
              <div className="tip-icon">📞</div>
              <p>Contact your bank if issue persists</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {canRetry(error) ? (
            <button 
              onClick={handleRetryPayment}
              className="btn btn-primary"
              disabled={retryCount >= 3}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 16H3v5" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Retry Payment {retryCount > 0 && `(${3 - retryCount} attempts left)`}
            </button>
          ) : (
            <Link to="/checkout" className="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Try Different Payment Method
            </Link>
          )}
          
          <Link to="/cart" className="btn btn-secondary">
            Back to Cart
          </Link>
        </div>

        {/* Alternative Actions */}
        <div className="alternative-actions">
          <h3>Other Options</h3>
          <div className="alt-buttons">
            <Link to="/" className="alt-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Continue Shopping
            </Link>
            
            <Link to="/contact" className="alt-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Contact Support
            </Link>

            <button 
              onClick={() => window.print()} 
              className="alt-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <polyline points="6,9 6,2 18,2 18,9" stroke="currentColor" strokeWidth="2"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="2"/>
                <rect x="6" y="14" width="12" height="8" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Print Details
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="support-section failure">
          <p>
            Having trouble? Our support team is here to help! 
            <a href="/contact">Get assistance</a> or call us at +880-1XXX-XXXXXX
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;