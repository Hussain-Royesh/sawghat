import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignUp from './Pages/LoginSignUp'
import Checkout from './Pages/Checkout'
import PaymentSuccess from './Pages/PaymentSuccess'
import PaymentFailure from './Pages/PaymentFailure'
import Orders from './Pages/Orders'
import Footer from './Components/Footer/Footer'
import ShopContextProvider from './Context/ShopContext'
import man_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'
import Subscription from './Components/Subscription/index'

function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path="/men" element={<ShopCategory banner={man_banner} category="men" />} />
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kids" />} /> 
          <Route path='/cart' element={<Cart />} />
          <Route path="/product/:productid" element={<Product />} />
          <Route path='/login' element={<LoginSignUp />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
          <Route path='/payment-failure' element={<PaymentFailure />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/subscription' element={<Subscription/>} />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </ShopContextProvider>
  )
}

export default App
