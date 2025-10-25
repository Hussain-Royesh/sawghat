import React, { useContext, useMemo } from 'react';
import './CSS/SearchResults.css';
import { ShopContext } from '../Context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import Items from '../Components/Items/Items';

const SearchResults = () => {
  const { all_products } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return all_products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }, [searchQuery, all_products]);

  return (
    <div className="search-results">
      <div className="search-results-header">
        <h2>Search Results for "{searchQuery}"</h2>
        <p>{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found</p>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="search-results-products">
          {filteredProducts.map((item) => (
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
      ) : (
        <div className="no-results">
          <p>No products found matching "{searchQuery}"</p>
          <p>Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
