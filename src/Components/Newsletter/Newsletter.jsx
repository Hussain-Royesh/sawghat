import React from 'react'
import './Newsletter.css'
const Newletter = () => {
  return (

    <div className='newsletter'>
      <h1>Get our Exclusive Offers on Your Email Daily</h1>
    
      <div>  <p>Subscribe to Our Channel and Stay Update</p></div>
     
      <div>
        <form action=""> <input type="email" placeholder='Enter Your Email to receive Update'  required />
        <button type='submit'>Subscribe</button></form>
        
      </div>
      
    </div>

  )
}

export default Newletter
