import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_logo from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [hrmeune, setHrmenue] = useState("shop");
      

       
  return (
    <div className="navbar">
        <div className='logo'>
            <img src={logo} alt="sawghat logo" />
            <h5>Sawghat Onine Store</h5>
        </div>
        <div className='nav-items'>
            <ul className='nav-menu'>
                <li onClick={()=>{setHrmenue("shop")}}> <Link to="/">Shop</Link> {hrmeune ==="shop" ?<hr/> :<></> }  </li>
               
                <li onClick={()=>{setHrmenue("men")}}> <Link to="/men">Men</Link> {hrmeune ==="men" ?<hr/> :<></>}</li>
                <li onClick={()=>{setHrmenue('women')}}> <Link to="Women">Women</Link> {hrmeune ==="women" ?<hr/> :<></>} </li>
                <li onClick={()=>{setHrmenue("kids")}}> <Link to="kids">Kids</Link> {hrmeune ==="kids"?<hr/>:<></>} </li>
            </ul>
        </div>
        <div className='nav-right'>
        <div className="login">
            <a href="/login"> <Link to="/login">Login</Link></a>
        </div>
        <div className='cart'>

           <Link to="cart"> <img src={cart_logo} alt="Cart-Logo" /> </Link>
            <div className='cart-count'> 0</div>
        </div>
        </div>
      
    </div>
  )
}

export default Navbar
