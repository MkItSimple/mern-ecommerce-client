import styled from "styled-components";
export const CartItemStyles = styled.div`
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  padding: 0.5em 0em;
  .colA {
    width: 74px;
    height: 74px;
    position: relative;
  }
  .colB {
    flex: 1;
    box-sizing: border-box;
    padding-left: .5em;
  }
  .image_container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .product_name {
    display: flex;
    text-transform: uppercase;
    /* margin-bottom: 0.5em; */
    font-size: var(--fontSizeMedium);
    .product_name_text {
      flex: 1;
      padding-top: 0px;
    }
    .remove_item {
      vertical-align: middle;
      height: 23px;
    }
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
    width: 50px;
    text-align: right;
    /* background-color: #eee; */
    font-size: var(--fontSizeMedium);
  }
  .quantity {
    width: fit-content;
    height: 27px;
    border: 1px solid var(--colorBorder);
    margin-top: 0.5em;
    /* background-color: #91999d; */
  }
  .quantity_icon {
    display: inline-block;
    height: calc(100% - 6px);
    width: 23px;
    vertical-align: middle;
    background-color: #fff;
    color: #000;
    box-sizing: border-box;
    padding: 1px 4px 5px 4px;
    &:hover {
      background-color: #000;
      color: #fff;
      cursor: pointer;
    }
  }
  .quantity_input {
    display: inline-block;
    height: 100%;
    width: 2em;
    font-family: 'Gotham Book';
    box-sizing: border-box;
    text-align: center;
    border: none;
    outline: none;
  }
`;
