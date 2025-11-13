import React, { useContext, useEffect, useState, useCallback } from 'react'
import './Popular.css'
import Items from '../Items/Items.jsx'
import { ShopContext } from '../../Context/ShopContext.jsx'

const Popular = () => {
  const { loadProducts } = useContext(ShopContext);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPopularProducts = useCallback(async () => {
    console.log('🔍 Popular: Starting to fetch products...');
    
    try {
      // First try to load women's products
      console.log('🔍 Popular: Calling loadProducts with women category');
      let response = await loadProducts({ 
        category: 'women',
        limit: 4
      });
      console.log('🔍 Popular: Women products response:', response);
      
      // If no women's products, try to load any products
      if (!response || !response.products || response.products.length === 0) {
        console.log('⚠️ Popular: No women products found, trying all products...');
        response = await loadProducts({ 
          limit: 4
        });
        console.log('🔍 Popular: All products response:', response);
      }
      
      if (response && response.products && response.products.length > 0) {
        console.log('✅ Popular: Setting products:', response.products.length);
        setPopularProducts(response.products);
      } else {
        console.warn('❌ Popular: No products in response:', response);
        setPopularProducts([]);
      }
    } catch (error) {
      console.error('❌ Popular: Error fetching products:', error);
      setPopularProducts([]);
    } finally {
      setLoading(false);
    }
  }, [loadProducts]);

  useEffect(() => {
    if (loadProducts) {
      fetchPopularProducts();
    } else {
      setLoading(false);
    }
  }, []); // Remove loadProducts dependency to prevent infinite loop

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
