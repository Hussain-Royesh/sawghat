import React, { createContext, useState, useEffect, useCallback } from "react";
import apiService from "../services/api.js";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    // =============== STATE MANAGEMENT ===============
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [cart, setCart] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [error, setError] = useState(null);

    // =============== AUTHENTICATION FUNCTIONS ===============
    
    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiService.login(credentials);
            
            if (response.success) {
                setUser(response.user);
                setIsAuthenticated(true);
                await loadUserCart();
                return { success: true, message: response.message };
            }
        } catch (error) {
            setError(error.message);
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiService.register(userData);
            
            if (response.success) {
                setUser(response.user);
                setIsAuthenticated(true);
                await loadUserCart();
                return { success: true, message: response.message };
            }
        } catch (error) {
            setError(error.message);
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        apiService.logout();
        setUser(null);
        setIsAuthenticated(false);
        setCart(null);
        setCartCount(0);
    };

    const checkAuthStatus = useCallback(async () => {
        try {
            if (apiService.isLoggedIn()) {
                const response = await apiService.verifyToken();
                if (response.success) {
                    setUser(response.user);
                    setIsAuthenticated(true);
                    await loadUserCart();
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            logout();
        } finally {
            setLoading(false);
        }
    }, []);

    // =============== PRODUCT FUNCTIONS ===============
    
    const loadProducts = useCallback(async (filters = {}) => {
        try {
            setError(null);
            console.log('Loading products with filters:', filters);
            const response = await apiService.getProducts(filters);
            console.log('API response:', response);
            if (response.success) {
                // Only update global products state if no specific filters (for general use)
                if (!filters.category && !filters.limit) {
                    setProducts(response.products);
                }
                return response;
            } else {
                console.error('API returned success: false', response);
                return response;
            }
        } catch (error) {
            setError(error.message);
            console.error('Error loading products:', error);
            throw error;
        }
    }, []);

    const loadFeaturedProducts = async () => {
        try {
            const response = await apiService.getFeaturedProducts();
            if (response.success) {
                setFeaturedProducts(response.products);
            }
        } catch (error) {
            console.error('Error loading featured products:', error);
        }
    };

    const getProduct = async (productId) => {
        try {
            const response = await apiService.getProduct(productId);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const searchProducts = async (searchTerm, filters = {}) => {
        try {
            const response = await apiService.searchProducts(searchTerm, filters);
            if (response.success) {
                setProducts(response.products);
                return response;
            }
        } catch (error) {
            setError(error.message);
            console.error('Error searching products:', error);
        }
    };

    // =============== CART FUNCTIONS ===============
    
    const loadUserCart = async () => {
        if (!isAuthenticated) return;
        
        try {
            const response = await apiService.getCart();
            if (response.success) {
                setCart(response.cart);
                setCartCount(response.cart.totalItems || 0);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };

    const addToCart = async (productId, quantity = 1, size, color) => {
        if (!isAuthenticated) {
            setError('Please login to add items to cart');
            return { success: false, message: 'Please login to add items to cart' };
        }

        try {
            console.log('ShopContext: Adding to cart with data:', { productId, quantity, size, color });
            const response = await apiService.addToCart({
                productId,
                quantity,
                size,
                color
            });

            console.log('ShopContext: API response:', response);

            if (response.success) {
                setCart(response.cart);
                setCartCount(response.cart.totalItems || 0);
                return { success: true, message: response.message || 'Item added to cart' };
            } else {
                return { success: false, message: response.message || 'Failed to add item to cart' };
            }
        } catch (error) {
            console.error('ShopContext: Error adding to cart:', error);
            setError(error.message);
            return { success: false, message: error.message };
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        try {
            const response = await apiService.updateCartItem(itemId, quantity);
            if (response.success) {
                setCart(response.cart);
                setCartCount(response.cart.totalItems || 0);
                return { success: true };
            }
        } catch (error) {
            setError(error.message);
            return { success: false, message: error.message };
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const response = await apiService.removeFromCart(itemId);
            if (response.success) {
                setCart(response.cart);
                setCartCount(response.cart.totalItems || 0);
                return { success: true };
            }
        } catch (error) {
            setError(error.message);
            return { success: false, message: error.message };
        }
    };

    const clearCart = async () => {
        try {
            const response = await apiService.clearCart();
            if (response.success) {
                setCart(response.cart);
                setCartCount(0);
                return { success: true };
            }
        } catch (error) {
            setError(error.message);
            return { success: false, message: error.message };
        }
    };

    // =============== UTILITY FUNCTIONS ===============
    
    const getTotalCartAmount = () => {
        return cart ? cart.totalAmount : 0;
    };

    const getTotalItems = () => {
        return cartCount;
    };

    const clearError = () => {
        setError(null);
    };

    // =============== EFFECTS ===============
    
    useEffect(() => {
        checkAuthStatus();
        loadFeaturedProducts();
    }, []); // Remove checkAuthStatus dependency to prevent infinite loop

    useEffect(() => {
        if (isAuthenticated) {
            loadUserCart();
        }
    }, [isAuthenticated]);

    // =============== CONTEXT VALUE ===============
    
    const contextValue = {
        // Auth State
        user,
        isAuthenticated,
        loading,
        
        // Auth Functions
        login,
        register,
        logout,
        
        // Product State
        products,
        featuredProducts,
        
        // Product Functions
        loadProducts,
        loadFeaturedProducts,
        getProduct,
        searchProducts,
        
        // Cart State
        cart,
        cartCount,
        
        // Cart Functions
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getTotalCartAmount,
        getTotalItems,
        
        // Utility
        error,
        clearError,
        
        // Legacy support (for existing components)
        all_products: products,
        cartItems: cart?.items || []
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;