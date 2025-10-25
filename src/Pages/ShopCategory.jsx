import React, { useState, useMemo } from 'react'
import './CSS/ShopCategory.css' 
import {ShopContext} from '../Context/ShopContext'
import drop_down from '../Components/Assets/dropdown_icon.png'
import Items from '../Components/Items/Items'

const ShopCategory = (props) => {
  const {all_products} = React.useContext(ShopContext)
  const [sortBy, setSortBy] = useState('default');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter products by category
  const categoryProducts = useMemo(() => {
    return all_products.filter(item => item.category === props.category);
  }, [all_products, props.category]);

  // Sort products based on selected option
  const sortedProducts = useMemo(() => {
    let products = [...categoryProducts];
    
    switch(sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.new_price - b.new_price);
      case 'price-high':
        return products.sort((a, b) => b.new_price - a.new_price);
      case 'name-az':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-za':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  }, [categoryProducts, sortBy]);

  const handleSortChange = (value) => {
    setSortBy(value);
    setShowSortDropdown(false);
  };

  return (
    <div className='shop-category'>
     {<img src={props.banner} alt="banner" className='category-banner'/>} 
    <div className="shop-category-controls">
      <div className="shop-category-indexsort">
        <p>
          <span>Showing {sortedProducts.length} items</span>
        </p>
      </div>
      
      <div className="shop-category-sort">
        <p onClick={() => setShowSortDropdown(!showSortDropdown)}> 
          Sort By: {sortBy === 'default' ? 'Default' : 
                    sortBy === 'price-low' ? 'Price: Low to High' :
                    sortBy === 'price-high' ? 'Price: High to Low' :
                    sortBy === 'name-az' ? 'Name: A-Z' : 'Name: Z-A'}
        </p>
        <img 
          src={drop_down} 
          alt="Drop Down Image" 
          onClick={() => setShowSortDropdown(!showSortDropdown)}
          className={showSortDropdown ? 'dropdown-open' : ''}
        />
        
        {showSortDropdown && (
          <div className="sort-dropdown">
            <div onClick={() => handleSortChange('default')}>Default</div>
            <div onClick={() => handleSortChange('price-low')}>Price: Low to High</div>
            <div onClick={() => handleSortChange('price-high')}>Price: High to Low</div>
            <div onClick={() => handleSortChange('name-az')}>Name: A-Z</div>
            <div onClick={() => handleSortChange('name-za')}>Name: Z-A</div>
          </div>
        )}
      </div>
    </div>

    <div className="shop-category-product">
      {sortedProducts.map((item) => (
        <Items 
          key={item.id} 
          id={item.id}   
          name={item.name} 
          image={item.image} 
          new_price={item.new_price} 
          old_price={item.old_price} 
        />
      ))}
    </div>
    </div>
  )
}

export default ShopCategory