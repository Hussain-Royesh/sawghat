import React, { useContext, useEffect, useState } from 'react'
import './CSS/ShopCategory.css' 
import { ShopContext } from '../Context/ShopContext'
import drop_down from '../Components/Assets/dropdown_icon.png'
import Items from '../Components/Items/Items'

const ShopCategory = (props) => {
  const { loadProducts } = useContext(ShopContext);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const response = await loadProducts({ 
          category: props.category,
          sort: sortBy,
          page: currentPage,
          limit: productsPerPage
        });
        if (response && response.products) {
          setCategoryProducts(response.products);
          setTotalProducts(response.totalProducts || response.products.length);
        }
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (props.category) {
      fetchCategoryProducts();
    }
  }, [loadProducts, props.category, sortBy, currentPage]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const startItem = (currentPage - 1) * productsPerPage + 1;
  const endItem = Math.min(currentPage * productsPerPage, totalProducts);

  if (loading && currentPage === 1) {
    return (
      <div className='shop-category'>
        <img src={props.banner} alt="banner" className='category-banner'/> 
        <div className="loading-spinner">Loading products...</div>
      </div>
    );
  }

  return (
    <div className='shop-category'>
      <img src={props.banner} alt="banner" className='category-banner'/> 
      
      <div className="shop-category-indexsort">
        <p>
          <span>Show Items {startItem}-{endItem}</span> out of {totalProducts}
        </p>
      </div>

      <div className="shop-category-sort">
        <p>Sort By</p>
        <select 
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortBy}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="name">Name</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="shop-category-product">
        {categoryProducts.map((item) => (
          <Items 
            key={item._id} 
            id={item._id} 
            name={item.name} 
            image={item.images[0]} 
            new_price={item.price} 
            old_price={item.originalPrice || item.price} 
          />
        ))}
        
        {categoryProducts.length === 0 && !loading && (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>

      {endItem < totalProducts && (
        <div className="explore-more">
          <button onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}

export default ShopCategory