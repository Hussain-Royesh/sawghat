import React, { useContext } from 'react'
import {ShopContext} from '../../Context/ShopContext'
import { useToast } from '../Toast/Toast'
import './DisplayProduct.css'

const DisplayProduct = (props) => {

    const {product} = props;    
    const{addToCart} = useContext(ShopContext);
    const { showToast } = useToast();
    
    const handleAddToCart = () => {
        addToCart(product.id);
        showToast(`${product.name} added to cart!`, 'success');
    };

  return (
    <div className='display_product'>
        <div className="display-lef">
            <div className="dispaly-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="display-main-img">
                <img src={product.image} alt="" />
            </div>
        </div>
        <div className="display-right">
            <h2 style={{fontSize:'50px'}}>{product.title}</h2>
            <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="old-price">${product.old_price}</p>
                <p className="new-price">${product.new_price}</p>
          
            <p className='display-description'>{product.description}</p>
            <div className="display-size">
                <h3>Size</h3>
                <div className="size-list"> 
                    <span>S</span>
                    <span>M</span>
                    <span>L</span>
                    <span>XL</span> 
                    <span>XXL</span>
                </div>
            </div>
            <div className="display-quantity">
           
            <button onClick={handleAddToCart} className='add-to-cart-btn'>Add to Cart</button> 
            <button className='buy-now-btn'>Buy Now</button>    

             </div>  
  </div>
        </div>
      
    </div>
  )
}

export default DisplayProduct