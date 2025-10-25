import { createContext, useState, useEffect } from "react";
import all_products from "../Components/Assets/all_product.js";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext(null);

const GetdefaultCart = () => {
    // Try to load cart from localStorage first
    const savedCart = localStorage.getItem('sawghat_cart');
    if (savedCart) {
        try {
            return JSON.parse(savedCart);
        } catch (e) {
            console.error('Error loading cart from localStorage:', e);
        }
    }
    
    // Return empty cart if nothing in localStorage
    let cart = {};
    for (let index = 0; index < all_products.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(GetdefaultCart());

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('sawghat_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }));
    }

    const clearCart = () => {
        setCartItems(GetdefaultCart());
        localStorage.removeItem('sawghat_cart');
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let iteminfo = all_products.find((product) => product.id === Number(item))
                if (iteminfo) {
                    totalAmount += cartItems[item] * iteminfo.new_price;
                }
            }
        }
        return totalAmount;
    }

    const getTotalItems = () => {
        let totalitems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalitems += cartItems[item];
            }
        }
        return totalitems;
    }

    const ShopContextValue = {
        getTotalItems,
        getTotalCartAmount,
        all_products,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart
    };

    return (
        <ShopContext.Provider value={ShopContextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;