import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_logo from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
    const [hrmeune, setHrmenue] = useState("shop");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const {getTotalItems} = useContext(ShopContext)

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    }

       
  return (
    <div className="navbar">
        <div className='logo'>
            <Link to="/" onClick={closeMobileMenu}>
                <img src={logo} alt="sawghat logo" />
            </Link>
            <h5>
                <Link to="/" style={{textDecoration:'none'}} onClick={closeMobileMenu}>
                    Sawghat Online Store
                </Link>
            </h5>
        </div>

        {/* Hamburger Menu Button */}
        <button 
            className={`hamburger-menu ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
        >
            <span></span>
            <span></span>
            <span></span>
        </button>

        <div className='nav-items'>
            <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <li onClick={()=>{setHrmenue("shop"); closeMobileMenu();}}>
                    <Link to="/" style={{textDecoration:'none'}}>Shop</Link>
                    {hrmeune ==="shop" ?<hr/> :<></> }
                </li>
                <li onClick={()=>{setHrmenue("men"); closeMobileMenu();}}>
                    <Link to="/men" style={{textDecoration:'none'}}>Men</Link>
                    {hrmeune ==="men" ?<hr/> :<></>}
                </li>
                <li onClick={()=>{setHrmenue('women'); closeMobileMenu();}}>
                    <Link to="/women" style={{textDecoration:'none'}}>Women</Link>
                    {hrmeune ==="women" ?<hr/> :<></>}
                </li>
                <li onClick={()=>{setHrmenue("kids"); closeMobileMenu();}}>
                    <Link to="/kids" style={{textDecoration:'none'}}>Kids</Link>
                    {hrmeune ==="kids"?<hr/>:<></>}
                </li>
            </ul>
        </div>

        <div className='nav-right'>
            <div className="login">
                <Link to="/login" style={{textDecoration:"none"}} onClick={closeMobileMenu}>
                    Login
                </Link>
            </div>
            <div className='cart'>
                <Link to="/cart" style={{textDecoration:'none'}} onClick={closeMobileMenu}>
                    <img src={cart_logo} alt="Cart-Logo" />
                </Link>
                <div className='cart-count'>{getTotalItems()}</div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
