import React from 'react'
import './DisplayProduct.css'
const DisplayProduct = (props) => {

    const {product} = props;    
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
            </div>
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
            </div>  
         <Link to="/cart">     <button className='add-to-cart-btn'>Add to Cart</button> </Link>
            <button className='buy-now-btn'>Buy Now</button>    

            

        </div>
      
    </div>
  )
}

export default DisplayProduct 