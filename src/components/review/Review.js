import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../cart/Cart";
import ReviewItem from "../reviewItem/ReviewItem";
import giphyImg from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  //place order
  const [orderPlace, setOrderPlace] = useState(false);
  const handlePlaceOrder = () => {
    setCart([]);
    setOrderPlace(true);
    processOrder();
  };
  useEffect(() => {
    const savedCard = getDatabaseCart();
    const productKeys = Object.keys(savedCard);
    const cardProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCard[key];
      return product;
    });
    setCart(cardProducts);
  }, []);
  const removeProduct = (productKey) => {
    // console.log("remove", productKey);
    const newCart = cart.filter((product) => product.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  let thanks;
  if (orderPlace) {
    thanks = <img src={giphyImg} alt="" />;
  }
  return (
    <div className="twin-container">
      {/* <h1>Cart Items:{cart.length}</h1> */}
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            key={pd.key}
            removeProduct={removeProduct}
            product={pd}
          ></ReviewItem>
        ))}
        {thanks}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handlePlaceOrder} className="main-btn">
            Place Order
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
