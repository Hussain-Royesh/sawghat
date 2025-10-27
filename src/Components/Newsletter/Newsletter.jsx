import React, { useState } from 'react'
import './Newsletter-clean.css'

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className='newsletter-section'>
      <div className='newsletter-container'>
        <div className='newsletter-content'>
          <div className='newsletter-icon'>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h1 className='newsletter-title'>
            Stay in the <span className='highlight'>Loop</span>
          </h1>
          
          <p className='newsletter-description'>
            Get exclusive access to new arrivals, special offers, and style tips delivered straight to your inbox. Join thousands of fashion lovers!
          </p>

          <form className='newsletter-form' onSubmit={handleSubmit}>
            <div className='input-group'>
              <input 
                type="email" 
                className='email-input'
                placeholder='Enter your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <button type='submit' className='subscribe-button'>
                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </div>
          </form>

          <div className='newsletter-benefits'>
            <div className='benefit'>
              <span className='benefit-icon'>🎉</span>
              <span>Exclusive Deals</span>
            </div>
            <div className='benefit'>
              <span className='benefit-icon'>📦</span>
              <span>New Arrivals First</span>
            </div>
            <div className='benefit'>
              <span className='benefit-icon'>💎</span>
              <span>VIP Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
