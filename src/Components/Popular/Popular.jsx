import React from 'react'
import './Popular.css'
import data from '../Assets/data.js'
import Items from '../Items/Items.jsx'
const Popular = () => {
  return (

    <div>   
        <h1 className='popular-heading'>Popular For Women</h1>
        <div className="popular-container">
            {data.map((item, i)=>{
                return(
                 <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                )
            })}
        </div>
    </div>
    
  )
}

export default Popular
