import React from 'react'
import './NewCollection.css'
import data from '../Assets/data.js'
import new_collection from '../Assets/new_collections'
import Items from '../Items/Items.jsx'
const NewCollection = () => {
  return (
    <div className='new-collection-heading'>
      <h1>New Cllections</h1>
      <hr />
  <div className="new-collection-container">
            {new_collection.map((item, i)=>{
                return(
                 <Items key={i}  name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                )
            })}
        </div>
    </div>
  )
}

export default NewCollection
