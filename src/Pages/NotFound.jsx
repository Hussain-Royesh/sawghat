import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Oops! Page Not Found</h1>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <div className="not-found-actions">
          <Link to="/" className="btn-home">
            Go to Homepage
          </Link>
          <Link to="/contact" className="btn-contact">
            Contact Support
          </Link>
        </div>
        <div className="suggestions">
          <h3>Here are some helpful links instead:</h3>
          <ul>
            <li><Link to="/men">Men's Collection</Link></li>
            <li><Link to="/women">Women's Collection</Link></li>
            <li><Link to="/kids">Kids' Collection</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
