import React from 'react'
import './Items.css'
import { Link } from 'react-router-dom'

const Items = (props) => {
  const handleImageClick = () => {
    window.scrollTo(0, 0);
  };

  // Add fallback image if no image is provided
  const imageUrl = props.image || '/placeholder-image.jpg';

  return (
    <div className='item'>
        <div className="item-card">
          <Link to={`/product/${props.id}`}> 
            <img 
              src={imageUrl} 
              onClick={handleImageClick} 
              alt={props.name || 'Product'} 
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          </Link>
          <h3>{props.name}</h3>
          <div className="price-info">
            <span className="new-price">৳{props.new_price}</span>
            {props.old_price && props.old_price !== props.new_price && (
              <span className="old-price">৳{props.old_price}</span>
            )}
          </div>
        </div>
    </div>
  )
}

export default Items
