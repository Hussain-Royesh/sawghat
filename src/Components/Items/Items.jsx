import React from 'react'
import './Items.css'
import { Link } from 'react-router-dom'
const Items = (props) => {
  return (
    <div className='item'>
        <div className="item-card">
         
          <Link to={`/product/${props.id}`} > <img src={props.image} onClick={window.scroll(0,0)} alt="item" /></Link>
           <h3>{props.id}</h3>
           <h3>{props.name}</h3>
            <span>New_Price: {props.new_price}</span>
            
            <span>Old_Price: {props.old_price}</span>
        </div>
    </div>
  )
}

export default Items
