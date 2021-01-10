import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import fakeData from "../../fakeData";
import { useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../cart/Cart";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";

function Shop() {
  const first10 = fakeData.slice(0, 10);
  const [product, setProduct] = useState(first10);
  //cart section => count order number
  const [cart, setCart] = useState([]);
  //cart section order summary fixed
  useEffect(()=> {
    const savedCard = getDatabaseCart();
    const productKeys = Object.keys(savedCard)
    const previousCart = productKeys.map(existingKey => {
      const product = fakeData.find(pd => pd.key === existingKey)
      product.quantity = savedCard[existingKey]
      return product
    })
    setCart(previousCart);

  },[])
  //btn function
  const handleAddProduct = (product) => {
    const toBeAdded = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAdded);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAdded);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    // store product in local storage

    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="twin-container">
      <div className="product-container">
        {product.map((product) => (
          <Product
            key={product.key}
            productBtn={true}
            handleAddProduct={handleAddProduct}
            product={product}
          ></Product>
        ))}
      </div>
      <div className="card-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-btn">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
}

export default Shop;
