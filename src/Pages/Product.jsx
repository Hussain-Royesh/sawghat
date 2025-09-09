import React, { useContext } from 'react'
import './CSS/Product.css'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import BreadCrump from '../Components/BreadCrump/BreadCrump'
import DisplayProduct from '../Components/DispayProduct/DisplayProduct'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Product = () => {
  const { all_products } = useContext(ShopContext);
  const { productid } = useParams();

 

  const product = all_products.find((e) => e.id === Number(productid));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <BreadCrump product={product} />
      <DisplayProduct product={product} />
      <DescriptionBox />
      <RelatedProducts/>

    </div>
  );
};

export default Product
