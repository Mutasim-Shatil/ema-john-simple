import React from 'react'
import './Reviewitem.css'

const ReviewItem = (props) => {
    // console.log(props);
    const {name,quantity,key,price} = props.product
    return (
      <div className="review-item">
        <h4>{name}</h4>
        <p>Quantity: {quantity}</p>
        <h5>Price: ${price}</h5>
        <button onClick={() => props.removeProduct(key)} className="main-btn">Remove</button>
      </div>
    );
}

export default ReviewItem
