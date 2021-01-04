import React from "react";

function Cart(props) {
  const cart = props.cart;
  //   const total = cart.reduce((total, prd) => total + prd.price, 0);
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price;
  }
  let shipping = 0;
  if (total > 50) {
    shipping = 4;
  } else if (total > 30) {
    shipping = 12;
  } else if (total > 0) {
    shipping = 12.99;
  }
  const tax = (total / 10).toFixed(2);
  return (
    <div>
      <h4>Order Summary</h4>
      <p>Items Order: {cart.length}</p>
      <p>Product Price: {total}</p>
      <p>Shipping cost: {shipping}</p>
      <p>Tax: {tax}</p>
      <p>Total Price: {total + shipping + Number(tax)}</p>
    </div>
  );
}

export default Cart;
