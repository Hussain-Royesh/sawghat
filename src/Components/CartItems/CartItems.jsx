import React, { useContext } from 'react';
import './cartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, cart, removeFromCart, updateCartItem } = useContext(ShopContext);

  // If no cart or empty cart
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="cartItems">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart to see them here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cartItems">
      <div className="cartItems-Container">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Size</p>
        <p>Color</p>
        <p>TOTAL</p>
        <p>Remove</p>
      </div>
      <hr />
      {cart.items.map((item) => {
        const product = item.product;
        return (
          <div key={item._id}>
            <div className="cartItems-format">
              <img 
                src={product.images?.[0] || '/placeholder-image.jpg'} 
                className="cart-icon" 
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmNWY1ZjUiLz48cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMTJaIiBzdHJva2U9IiM5OTkiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTgiIHI9IjIiIGZpbGw9IiM5OTkiLz48cGF0aCBkPSJNMTIgMjRMMTYgMjBMMjAgMjRMMjQgMjBMMjggMjQiIHN0cm9rZT0iIzk5OSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=';
                }}
              />
              <p>{product.name}</p>
              <p>${item.price}</p>
              <div className="quantity-controls">
                <button 
                  onClick={() => updateCartItem(item._id, item.quantity - 1)}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="cartitems-qut">{item.quantity}</span>
                <button 
                  onClick={() => updateCartItem(item._id, item.quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
              <p>{item.size}</p>
              <div className="color-display" style={{ backgroundColor: item.color.toLowerCase() }}>
                {item.color}
              </div>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <button 
                className='remove-button' 
                onClick={() => removeFromCart(item._id)}
                title="Remove item from cart"
              >
                <img src={remove_icon} alt="Remove" className="remove-icon" />
              </button>
            </div>
            <hr />
          </div>
        );
      })}

    <div className="cart-summary">
  <div className="cart-total">
    <div className="total-details">
      <div className="total-row">
        <span>Subtotal</span>
        <span>${getTotalCartAmount()}</span>
      </div>
      <div className="total-row">
        <span>Shipping Fee</span>
        <span>Free</span>
      </div>
      <hr />
      <div className="total-row final-total">
        <span>Total</span>
        <span>${getTotalCartAmount()}</span>
      </div>
    </div>
    
    <div className="cart-actions">
      <button className="checkout-btn" onClick={() => window.location.href = '/checkout'}>
        PROCEED TO CHECKOUT
      </button>
    </div>
  </div>

  <div className="promo-code">
    <h4>Do you have any promo Code to get Discount</h4>
    <input type="text" placeholder="Enter your Promo Code" required />
    <button>Submit</button>
  </div>
</div>

      
    </div>
    
    

  );
};

export default CartItems;