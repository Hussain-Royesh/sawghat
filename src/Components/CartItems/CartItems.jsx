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
                <img className='removeimg' style={{backgroundColor:'white', borderRadius:'20px', cursor:'pointer'}}
                  src={remove_icon} onClick={() => {removeFromCart(e.id);}}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

    <div className="cart-summary">
  <div className="cart-total">
    <p>Subtotal</p>
    <p>${getTotalCartAmount()}</p>
    <p>Shipping Fee</p>
    <p>Total</p>
    <p>${getTotalCartAmount()}</p>
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