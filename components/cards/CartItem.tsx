import Image from "next/image";
import { useApp } from "../../states/AppContext";
import { CartItemType } from "../../types";
import { CartItemStyles } from "./CartItemStyles";

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const {removeCartItem, incrementCartItem, decrementCartItem} = useApp();
  const removeCartItemHandler = () => {
    removeCartItem(cartItem._id)
  };

  return (
    <CartItemStyles>
      <div className="colA">
        <div className="image_container">
          <Image src={cartItem.images[0].url} alt="" layout="fill" objectFit="cover"/>
        </div>
      </div>
      <div className="colB">
        <div className="product_name"><span className="product_name_text">{cartItem.title}</span>  <svg
        aria-hidden="true"
        focusable="false"
        role="presentation"
        className="icon icon-close remove_item"
        viewBox="0 0 64 64"
        onClick={() => removeCartItemHandler() }
      >
        <path d="M19 17.61l27.12 27.13m0-27.12L19 44.74"></path>
      </svg></div>
        <div className="product_description">
          <div className="variants">
            <span>Brand: {cartItem.brand.name}</span>
            <span>Color: {cartItem.color.name}</span>
            
            <span>Size: {cartItem.size.name}</span>
            <br />
            <div className="quantity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-dash-lg quantity_icon"
                viewBox="0 0 16 16"
                onClick={() => decrementCartItem(cartItem._id)}
              >
                <path
                  fillRule="evenodd"
                  d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                />
              </svg>
              <input type="text" value={cartItem.quantity} className="quantity_input" onChange={() => {}} />
              {/* <div className="quantity_input">{cartItem.quantity}</div> */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-lg quantity_icon"
                viewBox="0 0 16 16"
                onClick={() => incrementCartItem(cartItem._id)}
              >
                <path
                  fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                />
              </svg>
            </div>
          </div>
          <div className="price">₱{cartItem.sale === 'Yes' ? cartItem.discount_price * cartItem.quantity : cartItem.price * cartItem.quantity}</div>
        </div>
      </div>
    </CartItemStyles>
  );
};

export default CartItem;
