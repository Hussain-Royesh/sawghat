import React, { useContext, useEffect, useState } from 'react'
import './Popular.css'
import Items from '../Items/Items.jsx'
import { ShopContext } from '../../Context/ShopContext.jsx'

const Popular = () => {
  const { loadProducts } = useContext(ShopContext);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      console.log('Fetching popular products...');
      try {
        // First try to load women's products
        let response = await loadProducts({ 
          category: 'women',
          limit: 4
        });
        console.log('Women products response:', response);
        
        // If no women's products, try to load any products
        if (!response || !response.products || response.products.length === 0) {
          console.log('No women products found, trying all products...');
          response = await loadProducts({ 
            limit: 4
          });
          console.log('All products response:', response);
        }
        
        if (response && response.products) {
          setPopularProducts(response.products);
          console.log('Products loaded:', response.products.length);
        } else {
          console.warn('No products in response');
        }
      } catch (error) {
        console.error('Error fetching popular products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, [loadProducts]);

  if (loading) {
    return (
      <div className="popular-loading">
        <h1 className='popular-heading'>Popular For Women</h1>
        <div className="loading-spinner">Loading popular products...</div>
      </div>
    );
  }

  return (
    <div>   
        <h1 className='popular-heading'>Popular For Women</h1>
        <div className="popular-container">
            {popularProducts.map((item)=>{
                return(
                 <Items 
                   key={item._id} 
                   id={item._id} 
                   name={item.name} 
                   image={item.images[0]} 
                   new_price={item.price} 
                   old_price={item.originalPrice || item.price} 
                 />
                )
            })}
            {popularProducts.length === 0 && (
              <div className="no-products">
                No popular products available at the moment.
              </div>
            )}
        </div>
    </div>
  )
}

export default Popular
