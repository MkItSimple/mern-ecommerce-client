import Image from "next/image";
import React from "react";
import { CheckoutItemType } from "../../types";
import { CheckoutItemStyles } from "./CheckoutItemStyles";

const CheckoutItem = ({ product }: { product: CheckoutItemType }) => {
  
  return (
    <CheckoutItemStyles>
      <div className="colA">
        <div className="image_container">
          <Image src={product.image} alt="" layout="fill" objectFit="cover" />
        </div>
        <div className="quantity">{product.quantity}</div>
        {/* <div className="quantity">7</div> */}
      </div>
      <div className="colB">
        <div className="product_name">{product.title}</div>
        <div className="product_description">
          <div className="variants">
            <span>Brand: {product.brand}</span>
            <span>Color: {product.color}</span>
            <br />
            <span>Size: {product.size}</span>
          </div>
          <div className="price">₱{product.sale === "Yes" ? product.discount_price * product.quantity : product.price * product.quantity}</div>
        </div>
      </div>
    </CheckoutItemStyles>
  );
};

export default CheckoutItem;
