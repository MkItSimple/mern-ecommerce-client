import styled from "styled-components";
export const CheckoutItemStyles = styled.div`
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  .colA {
    width: 90px;
    height: 90px;
    position: relative;
  }
  .colB {
    flex: 1;
    box-sizing: border-box;
    padding-left: 1em;
  }
  .quantity {
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: #91999d;
    color: var(--colorWhite);
    height: 23px;
    width: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3em 0.5em;
    padding-top: 0.3em;
    font-size: 1em;
  }
  .image_container {
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
    position: relative;
  }
  .product_name {
    text-transform: uppercase;
    margin-bottom: 0.5em;
    font-size: var(--fontSizeMedium);
  }
  .product_description {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .variants {
    flex: 1;
    span {
      padding-right: 0.5em;
      margin-right: 0.5em;
      border-right: 1px dotted #b1b1b1;
      font-size: var(--fontSizeSmall);
    }
  }
  .price {
    width: 80px;
    text-align: right;
    /* background-color: #eee; */
    font-size: var(--fontSizeMedium);
  }
`;
