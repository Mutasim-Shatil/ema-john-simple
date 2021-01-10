import React from 'react'
import { useParams } from 'react-router-dom'
import fakeData from '../../fakeData'
import Product from '../Product/Product'

const ProductDetail = () => {
    const {productKey} = useParams()
    const products = fakeData.find(pk => pk.key === productKey);
    // console.log(products);
    return (
      <div>
        <h1>Product Details</h1>
        <Product product={products} productBtn={false}></Product>
      </div>
    );
}

export default ProductDetail
