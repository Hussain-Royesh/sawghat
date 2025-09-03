import React from 'react'
import './Newsletter.css'
const Newletter = () => {
  return (

    <div className='newsletter'>
      <h1>Get our Exclusive Offers on Your Email Daily</h1>
    
      <div>  <p>Subscribe to Our Channel and Stay Update</p></div>
     
      <div>
        <input type="email" placeholder='Enter Your Email to receive Update'  />
        <button>Subscribe</button>
      </div>
      
    </div>

  )
}

export default Newletter
