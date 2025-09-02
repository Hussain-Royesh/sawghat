import React from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_logo from '../Assets/cart_icon.png'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className='logo'>
            <img src={logo} alt="sawghat logo" />
            <h5>Sawghat Onine Store</h5>
        </div>
        <div className='nav-items'>
            <ul><li><a href="/">Shop</a></li></ul>
            <ul><li><a href="/products">Man</a></li></ul>
            
            <ul><li><a href="/about">Women</a></li></ul>
            <ul><li><a href="/contact">Kids</a></li></ul>
        </div>
        <div className='nav-right'>
        <div className="login">
            <a href="/login">Login</a>
        </div>
        <div className='cart'>

            <img src={cart_logo} alt="Cart-Logo" />
            <div className='cart-count'>0</div>
        </div>
        </div>
      
    </div>
  )
}

export default Navbar
