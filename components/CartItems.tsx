import { useApp } from "../states/AppContext";
import { CartItemType } from "../types";
import CartItem from "./cards/CartItem";
import styled from "styled-components";

const CartItemsStyles = styled.div`
  display: block;
  margin-bottom: 1em;
`;

const CartItems = () => {
  const { cart } = useApp()

  return (
    <CartItemsStyles>
      {cart.map((item: CartItemType) => (
        <CartItem key={item._id} cartItem={item} />
      ))}
    </CartItemsStyles>
  );
};

export default CartItems;
