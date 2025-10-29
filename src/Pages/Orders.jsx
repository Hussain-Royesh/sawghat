import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import './CSS/Orders.css';

const Orders = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        setError('Please login to view your orders');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:4001/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#f59e0b',
      'confirmed': '#3b82f6',
      'shipped': '#8b5cf6',
      'delivered': '#10b981',
      'cancelled': '#ef4444',
      'refunded': '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'pending': '⏱️',
      'confirmed': '✅',
      'shipped': '🚚',
      'delivered': '📦',
      'cancelled': '❌',
      'refunded': '💰'
    };
    return icons[status] || '❓';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const getOrderTotal = (order) => {
    const itemsTotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = order.shippingAddress ? 60 : 0;
    return itemsTotal + shippingFee;
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h2>Unable to Load Orders</h2>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={fetchOrders} className="retry-btn">
              Try Again
            </button>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <div className="header-content">
          <h1>My Orders</h1>
          <p>Track and manage your orders</p>
        </div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-number">{orders.length}</span>
            <span className="stat-label">Total Orders</span>
          </div>
          <div className="stat">
            <span className="stat-number">{orders.filter(o => o.status === 'delivered').length}</span>
            <span className="stat-label">Delivered</span>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
          <Link to="/" className="shop-now-btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Filter Tabs */}
          <div className="filter-tabs">
            <button 
              className={filter === 'all' ? 'tab active' : 'tab'}
              onClick={() => setFilter('all')}
            >
              All Orders ({orders.length})
            </button>
            {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(status => {
              const count = orders.filter(o => o.status === status).length;
              if (count === 0) return null;
              
              return (
                <button 
                  key={status}
                  className={filter === status ? 'tab active' : 'tab'}
                  onClick={() => setFilter(status)}
                >
                  <span className="tab-icon">{getStatusIcon(status)}</span>
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                </button>
              );
            })}
          </div>

          {/* Orders List */}
          <div className="orders-list">
            {filteredOrders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order._id.slice(-8)}</h3>
                    <p className="order-date">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="order-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: `${getStatusColor(order.status)}15`, color: getStatusColor(order.status) }}
                    >
                      {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-meta">
                          Category: {item.category} | Size: {item.size || 'One Size'}
                        </p>
                        <p className="item-quantity">Qty: {item.quantity}</p>
                      </div>
                      <div className="item-price">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="summary-row">
                    <span>Items ({order.items.length})</span>
                    <span>{formatCurrency(order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>{order.shippingAddress ? formatCurrency(60) : 'Free'}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>{formatCurrency(getOrderTotal(order))}</span>
                  </div>
                </div>

                <div className="order-actions">
                  <Link 
                    to={`/order/${order._id}`} 
                    className="action-btn primary"
                  >
                    View Details
                  </Link>
                  
                  {order.status === 'delivered' && (
                    <button className="action-btn secondary">
                      Reorder
                    </button>
                  )}
                  
                  {['pending', 'confirmed'].includes(order.status) && (
                    <button className="action-btn danger">
                      Cancel Order
                    </button>
                  )}

                  {order.status === 'delivered' && (
                    <button className="action-btn secondary">
                      Leave Review
                    </button>
                  )}
                </div>

                {order.trackingNumber && (
                  <div className="tracking-info">
                    <div className="tracking-header">
                      <span className="tracking-icon">📍</span>
                      <span>Tracking Number: <strong>{order.trackingNumber}</strong></span>
                    </div>
                    <button className="track-btn">
                      Track Package
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/" className="quick-action">
          <div className="action-icon">🛍️</div>
          <div className="action-text">
            <h4>Continue Shopping</h4>
            <p>Discover new products</p>
          </div>
        </Link>

        <Link to="/support" className="quick-action">
          <div className="action-icon">💬</div>
          <div className="action-text">
            <h4>Need Help?</h4>
            <p>Contact customer support</p>
          </div>
        </Link>

        <Link to="/account" className="quick-action">
          <div className="action-icon">⚙️</div>
          <div className="action-text">
            <h4>Account Settings</h4>
            <p>Manage your account</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Orders;