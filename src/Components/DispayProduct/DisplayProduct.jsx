import React, { useContext, useState } from 'react'
import {ShopContext} from '../../Context/ShopContext'
import { useNavigate } from 'react-router-dom'
import './DisplayProduct.css'

const DisplayProduct = (props) => {
    const {product} = props;    
    const {addToCart, isAuthenticated} = useContext(ShopContext);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    if (!product) return null;

    const images = product.images || [];
    const mainImage = images[selectedImage] || images[0] || '/placeholder-image.jpg';

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            alert('Please login to add items to cart');
            navigate('/login');
            return;
        }

        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        if (!selectedColor) {
            alert('Please select a color');
            return;
        }

        try {
            setLoading(true);
            console.log('Adding to cart:', {
                productId: product._id,
                quantity: 1,
                size: selectedSize,
                color: selectedColor
            });

            const result = await addToCart(product._id, 1, selectedSize, selectedColor);
            console.log('Add to cart result:', result);

            if (result && result.success) {
                alert('Product added to cart successfully!');
            } else {
                alert(result?.message || 'Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add product to cart');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='display_product'>
            <div className="display-left">
                <div className="display-img-list">
                    {images.slice(0, 4).map((img, index) => (
                        <img 
                            key={index}
                            src={img} 
                            alt={`${product.name} ${index + 1}`}
                            onClick={() => setSelectedImage(index)}
                            className={selectedImage === index ? 'selected' : ''}
                        />
                    ))}
                </div>
                <div className="display-main-img">
                    <img src={mainImage} alt={product.name} />
                </div>
            </div>
            <div className="display-right">
                <h1>{product.name}</h1>
                <div className="product-rating">
                    <div className="stars">
                        {'★'.repeat(Math.floor(product.ratings?.average || 0))}
                        {'☆'.repeat(5 - Math.floor(product.ratings?.average || 0))}
                    </div>
                    <span>({product.ratings?.count || 0} reviews)</span>
                </div>
                <div className="product-prices">
                    <span className="new-price">৳{product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="old-price">৳{product.originalPrice}</span>
                    )}
                </div>
                <p className='display-description'>{product.description}</p>
                
                {/* Product specifications */}
                {product.specifications && (
                    <div className="product-specs">
                        <h3>Specifications</h3>
                        <ul>
                            {product.specifications.material && <li>Material: {product.specifications.material}</li>}
                            {product.specifications.care && <li>Care: {product.specifications.care}</li>}
                            {product.specifications.origin && <li>Origin: {product.specifications.origin}</li>}
                        </ul>
                    </div>
                )}
                
                <div className="display-size">
                    <h3>Select Size *</h3>
                    <div className="size-list"> 
                        {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                            <span 
                                key={size}
                                className={selectedSize === size ? 'selected' : ''}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </span>
                        ))}
                    </div>
                </div>
                
                <div className="display-color">
                    <h3>Select Color *</h3>
                    <div className="color-list"> 
                        {['Black', 'White', 'Red', 'Blue', 'Green', 'Gray'].map(color => (
                            <div
                                key={color}
                                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                                onClick={() => setSelectedColor(color)}
                                style={{ 
                                    backgroundColor: color.toLowerCase(),
                                    border: color === 'White' ? '2px solid #ddd' : 'none'
                                }}
                                title={color}
                            >
                                {selectedColor === color && <span className="checkmark">✓</span>}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="stock-info">
                    <p>In Stock: {product.stock || 0} items</p>
                </div>
                
                <div className="display-actions">
                    <button 
                        onClick={handleAddToCart} 
                        className='add-to-cart-btn'
                        disabled={product.stock === 0 || loading}
                    >
                        {loading ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button> 
                    <button className='buy-now-btn'>Buy Now</button>    
                </div>
                
                {/* Product tags */}
                {product.tags && product.tags.length > 0 && (
                    <div className="product-tags">
                        <h4>Tags:</h4>
                        {product.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DisplayProduct 