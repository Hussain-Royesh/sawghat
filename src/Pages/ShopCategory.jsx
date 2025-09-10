import React from 'react'
import './CSS/ShopCategory.css' 
import {ShopContext} from '../Context/ShopContext'
import drop_down from '../Components/Assets/dropdown_icon.png'
import all_products from '../Components/Assets/all_product.js'
import Items from '../Components/Items/Items'

const ShopCategory = (props) => {

  const {all_products} = React.useContext(ShopContext)
  return (
    <div className='shop-category'>
     {<img src={props.banner} alt="banner" className='category-banner'/>} 
    <div className="shop-category-indexsort">
      <p>
        <span>Show Items 1-12</span> out of 36
      </p>

    </div>
    <div className="shop-category-sort">

     <p> Sort By </p><img src= {drop_down} alt="Drop Down Image"  />
    </div>
    <div className="shop-category-product">
     
      {all_products.map((item,i)=>{
        if(item.category === props.category){
             return  <Items key={i} id={item.id}   name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        }
        else{ 
          return null
        } 
      })}

    </div>
    <div className="explore-more">
      <button>Explore More</button>
    </div>
    </div>
  )
}

export default ShopCategory