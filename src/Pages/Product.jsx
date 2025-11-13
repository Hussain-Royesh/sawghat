import React, { useContext, useState, useEffect } from 'react'
import './CSS/Product.css'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import BreadCrump from '../Components/BreadCrump/BreadCrump'
import DisplayProduct from '../Components/DispayProduct/DisplayProduct'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Product = () => {
  const { getProduct } = useContext(ShopContext);
  const { productid } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching product with ID:', productid);
        
        const response = await getProduct(productid);
        console.log('Product response:', response);
        
        if (response && response.success && response.product) {
          setProduct(response.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productid) {
      fetchProduct();
    }
  }, [productid, getProduct]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Product not found</h2>
        <p>Sorry, the product you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <BreadCrump product={product} />
      <DisplayProduct product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product
