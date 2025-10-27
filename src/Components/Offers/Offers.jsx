import React from 'react'
import './Offers.css'
import ExclusiveOffers from '../Assets/exclusive_image.png'
const Offer = () => {
  return (
    <section className='offers'>
      <div className='offers-left'>
        <h1>Exclusive</h1>
        <h1>Special Offers</h1>
        <p>Don't miss out! Get up to 50% off on premium products. Limited time offer for our valued customers.</p>
        <button className='offer-btn'>Shop Now</button>
      </div>
      <div className='offers-right'>
        <img src={ExclusiveOffers} alt="Exclusive offers - Premium products with amazing discounts" />
      </div>
    </section>
  )
}

export default Offer
