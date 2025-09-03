import react, { createContext, useState } from "react";
import all_products from "../Components/Assets/all_product.js";


export const ShopContext = createContext(null);
const ShopContextProvider = (props) => {
    const ShopContextValue = {all_products};
    return (
        <ShopContext.Provider value={ShopContextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}        

export default ShopContextProvider;