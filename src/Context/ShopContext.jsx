import react, { createContext, useState } from "react";
import all_products from "../Components/Assets/all_product.js";


export const ShopContext = createContext(null);

const GetdefaultCart =()=>{
        let cart = {};
        for (let index = 0; index < all_products.length+1; index++) {
           cart[index] =0;
            
        }
        return cart;
    }
const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(GetdefaultCart());

    const addToCart =(itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems)

    }   
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount =()=>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let iteminfo = all_products.find((product)=> product.id === Number(item))
                totalAmount += cartItems[item] * iteminfo.new_price;
            }
           
        }
         return totalAmount;
    }
    const getTotalItems =()=>{
        let totalitems = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalitems += cartItems[item];
            }
        }
        return totalitems;
    }

    const ShopContextValue = {getTotalItems,getTotalCartAmount,all_products, cartItems, addToCart,removeFromCart};
    console.log(cartItems)

    return (
        <ShopContext.Provider value={ShopContextValue}>
            {props.children}
        </ShopContext.Provider>
    );
        
}

export default ShopContextProvider;