import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import './product.css'
import { Link } from 'react-router-dom';

function Product(props) {
    // console.log(props);
    const {img,name,price,seller,stock,key} = props.product;
    return (
      <div className="product">
        <div>
          <img src={img} alt="" />
        </div>
        <div>
          <h4 className="product-name">
            <Link to={'/product/' + key}>{name}</Link>
          </h4>
          <br />
          <p>
            By: <small>{seller}</small>
          </p>
          <p>${price}</p>
          <p>Only {stock} left in stock -Order soon</p>
          { props.productBtn && <button
            onClick={() => props.handleAddProduct(props.product)}
            className="main-btn"
          >
            {" "}
            <FontAwesomeIcon icon={faShoppingCart} />
            add to card
          </button>}
        </div>
      </div>
    );
}

export default Product
