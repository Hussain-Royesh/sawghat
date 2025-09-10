import React from 'react'
import './BreadCrump.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
const BreadCrump = (props) => {
    const {product} = props;

  return (
    <div className='breadcrump'>
      
      Home  <img src={arrow_icon} alt=""  /> Shop <img src={arrow_icon} alt="" /> {product?.category} <img src={arrow_icon} alt="" /> {product?.name}

    </div>
  )
}

export default BreadCrump
