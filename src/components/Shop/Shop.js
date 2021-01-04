import React from "react";
import fakeData from "../../fakeData";
import { useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../cart/Cart";

function Shop() {
  const first10 = fakeData.slice(0, 10);
  const [product, setProduct] = useState(first10);
  //cart section => count order number
  const [cart, setCart] = useState([]);
  //btn function
  const handleAddProduct = (product) => {
    // console.log("btn", product);
    const newCart = [...cart,product]
    setCart(newCart)
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        {product.map((product) => (
          <Product
            handleAddProduct={handleAddProduct}
            product={product}
          ></Product>
        ))}
      </div>
      <div className="card-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
}

export default Shop;
