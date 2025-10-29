import React, { useContext } from 'react';
import './cartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const {getTotalCartAmount, all_products, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className="cartItems">
      <div className="cartItems-Container">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Qut</p>
        <p>TOTAL</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartItems-format">
                <img src={e.image} className="cart-icon" alt="" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems qut">{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <button 
                  className='remove-button' 
                  onClick={() => {removeFromCart(e.id);}}
                  title="Remove item from cart"
                >
                  <img src={remove_icon} alt="Remove" className="remove-icon" />
                </button>
              </div>
              <hr />
            </div>
          );
        }
        return null;
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