import React from "react";
import { CheckoutItemType } from "../types";
import CheckoutItem from "./cards/CheckoutItem";
import styled from "styled-components";

const CheckoutItemsStyles = styled.div`
  margin-bottom: 1em;
`;

const CheckoutItems = ({products}: {products: CheckoutItemType[]}) => {

  return (
    <CheckoutItemsStyles>
      {products.map((product, index) => (
        <CheckoutItem key={product._id} product={product}/>
      ))}
    </CheckoutItemsStyles>
  );

};

export default CheckoutItems;
