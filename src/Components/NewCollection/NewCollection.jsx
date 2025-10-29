import React, { useContext, useEffect, useState } from 'react'
import './NewCollection.css'
import Items from '../Items/Items.jsx'
import { ShopContext } from '../../Context/ShopContext.jsx'

const NewCollection = () => {
  const { loadProducts } = useContext(ShopContext);
  const [newCollections, setNewCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewCollections = async () => {
      try {
        const response = await loadProducts({ 
          newArrival: true,
          limit: 8
        });
        if (response && response.products) {
          setNewCollections(response.products);
        }
      } catch (error) {
        console.error('Error fetching new collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewCollections();
  }, [loadProducts]);

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
