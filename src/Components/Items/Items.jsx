import React from 'react'
import './Items.css'

const Items = (props) => {
  return (
    <div className='item'>
        <div className="item-card">
            <h5>{props.id}</h5>
             <h3>{props.name}</h3>
            <img src={props.image} alt="item" />
            <span>New_Price: {props.new_price}</span>
            
            <span>Old_Price: {props.old_price}</span>
        </div>
    </div>
  )
}

export default Items
