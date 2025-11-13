import React, { useContext, useEffect, useState, useCallback } from 'react'
import './NewCollection.css'
import Items from '../Items/Items.jsx'
import { ShopContext } from '../../Context/ShopContext.jsx'

const NewCollection = () => {
  const { loadProducts } = useContext(ShopContext);
  const [newCollections, setNewCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewCollections = useCallback(async () => {
    try {
      // First try to load new arrivals
      let response = await loadProducts({ 
        newArrival: true,
        limit: 8
      });
      
      // If no new arrivals, load recent products
      if (!response || !response.products || response.products.length === 0) {
        console.log('No new arrivals found, trying recent products...');
        response = await loadProducts({ 
          limit: 8,
          sort: 'createdAt'
        });
      }
      
      if (response && response.products) {
        setNewCollections(response.products);
      }
    } catch (error) {
      console.error('Error fetching new collections:', error);
    } finally {
      setLoading(false);
    }
  }, [loadProducts]);

  useEffect(() => {
    if (loadProducts) {
      fetchNewCollections();
    } else {
      setLoading(false);
    }
  }, []); // Remove loadProducts dependency to prevent infinite loop

  if (loading) {
    return (
      <div className='new-collection-heading'>
        <h1>New Collections</h1>
        <hr style={{marginBottom:'30px'}} />
        <div className="loading-spinner">Loading new collections...</div>
      </div>
    );
  }

  return (
    <div className='new-collection-heading'>
      <h1>New Collections</h1>
      <hr style={{marginBottom:'30px'}} />
      <div className="new-collection-container">
            {newCollections.map((item)=>{
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
            {newCollections.length === 0 && (
              <div className="no-products">
                No new collections available at the moment.
              </div>
            )}
        </div>
    </div>
  )
}

export default NewCollection
