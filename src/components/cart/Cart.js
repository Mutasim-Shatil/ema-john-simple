import React from "react";

function Cart(props) {
  const cart = props.cart;
  //   const total = cart.reduce((total, prd) => total + prd.price, 0);
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = (total + product.price * product.quantity);
    total.toFixed(2)
  }
  let shipping = 0;
  if (total > 50) {
    shipping = 4;
  } else if (total > 30) {
    shipping = 12;
  } else if (total > 0) {
    shipping = 12.99;
  }
  // shipping.toFixed(2)
  const tax = (total / 10).toFixed(2);
  const grandTotal = (total + shipping + Number(tax)).toFixed(2);
  const formateNumber = num => {
    const precision = num.toFixed(2);
    return Number(precision)
  }
  return (
    <div>
      <h4>Order Summary</h4>
      <p>Items Order: {cart.length}</p>
      <p>Product Price: {formateNumber(total)}</p>
      <p>Shipping cost: {shipping}</p>
      <p>Tax: {tax}</p>
      <p>Total Price: {grandTotal}</p>
      <br />
      {/* use Number string to num */}
      {/* <Link to="/review">
        <button className="main-btn">Review Order</button>
      </Link> */}
      {
        props.children
      }
    </div>
  );
}

export default Cart;
