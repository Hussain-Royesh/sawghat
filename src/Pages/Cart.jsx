import React, { useContext } from 'react';
import './CSS/Cart.css';
import { ShopContext } from '../Context/ShopContext';
import CartItems from '../Components/CartItems/CartItems';

const Cart = () => {

return(
  <div>
    
    <CartItems/>
  </div>
)


  // const {all_product, CartItems, removeFromItems } = useContext(ShopContext);

//   // Calculate total price
//   const totalPrice = cart.reduce((total, item) => {
//     const product = all_product.find((p) => p.id === item.id);
//     return total + (product?.price || 0) * item.quantity;
//   }, 0);

//   return (
//     <div className='cart'>
//       <h1>Your Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty. Start shopping!</p>
//       ) : (
//         <div className='cart-list'>
//           {cart.map((item) => {
//             const product = all_product.find((p) => p.id === item.id);
//             return (
//               <div key={item.id} className='cart-item'>
//                 <img src={product?.image} alt={product?.name} className='cart-item-image' />
//                 <div className='cart-item-details'>
//                   <h2>{product?.name}</h2>
//                   <p>Price: ${product?.price}</p>
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Subtotal: ${product?.price * item.quantity}</p>
//                 </div>
//               </div>
//             );
//           })}
//           <div className='cart-total'>
//             <h2>Total: ${totalPrice}</h2>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
};
export default Cart;