import React from 'react'
import './Offers.css'
import ExclusiveOffers from '../Assets/exclusive_image.png'
const Offer = () => {
  return (
    <div className='offers'>
      <div className='offers-left'>
        <h1>Exclusive</h1>

        <h1>Special Offers</h1>

        <p>Get 50% off on your first purchase!</p>

        <button className='offer-btn'>Shop Now</button>
      </div>
      <div className='offers-right'>
        <img src={ExclusiveOffers} alt="The Exclusive Offers Image" />
      </div>
      
    </div>
  )
}

export default Offer
