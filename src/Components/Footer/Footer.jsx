import React from 'react'
import './Footer.css'
import footer_log from '../Assets/logo.png'
import instagram from '../Assets/instagram_icon.png'
import whatsApp from '../Assets/whatsapp_icon.png'
import pintester from '../Assets/pintester_icon.png'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_log} alt="the Footer Logo" />
            <p>Sawghat </p>
        </div>
        <ul className='footer-links'>
            <li>Home</li>
            <li>About</li>
            <li>Cart</li>
            <li>Contact Us</li>
            <li>Feedback</li>
            <Link to='subscription' >    <li>Subscribe</li> </Link>
        </ul>
        <div className="footer-social">
            <div className="footer-social-container">
              
                <i className="pintester "> <img src={pintester} alt="instagram picture" /> </i>
                <i className="WhatsApp"><img src={whatsApp} alt=" WhatsApp icon and picture" /> </i>
                <i className="instagram"> <img src={instagram} alt="instagram picture" /> </i>
                
            </div>

            
            </div>
        <div className="copy-right">
            <p>Copyright © 2025 Sawghat. All rights reserved.</p>
            </div>      
    </div>
  )
}

export default Footer
