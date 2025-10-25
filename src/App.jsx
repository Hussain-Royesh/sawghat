import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignUp from './Pages/LoginSignUp'
import Footer from './Components/Footer/Footer'
import man_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'
 

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path="/men" element={<ShopCategory banner={man_banner} category="men" />} />
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid" />} /> 
          <Route path='/cart' element={<Cart />} />
          <Route path="/product/:productid" element={<Product />} />
          <Route path='/login' element={<LoginSignUp />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
