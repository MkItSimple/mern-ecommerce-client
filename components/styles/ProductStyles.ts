import styled from "styled-components";
import { device } from "./GlobalStyles";
// import { device } from "../GlobalStyles";
export const ProductStyles = styled.div`
  color: black;
  .product_wrapper {
    max-width: 1500px;
    margin: 0 auto;
    padding: 1.7em 2.3em 0em 2.3em;
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    @media only screen and ${device.tablet} {
      flex-direction: column;
    }
    @media only screen and ${device.mobileL} {
      padding: 1.7em 1em 0em 1em;
    }
  }
  .left {
    /* background-color: orange; */
    flex: 1;
    @media only screen and ${device.tablet} {
      padding: 0em 5em
    }
     @media only screen and ${device.mobileL} {
      padding: 0em 0em
    }
  }
  .right {
    flex: 1;
  }
  .right_wrapper {
    display: block;
    box-sizing: border-box;
    padding: 2.5em;
    @media only screen and ${device.mobileL} {
      padding: 2em 1.5em;
    }
  }
  
  .product_name {
    margin: 0em;
    @media only screen and ${device.mobileL} {
      font-size: 1.5em;
    }
  }
  .price_container {
    padding: 1.5em 0em;
    margin-bottom: 1.5em;
    border-bottom: 1px solid #e8e8e1;
    @media only screen and ${device.mobileL} {
      padding: 1em 0em;
      margin-bottom: 1em;
    }
    span {
      margin-right: 1em;
    }
  }
  .old_price {
    text-decoration: line-through;
  }
  .save_price {
    color: red;
  }

  .variant_header {
    display: block;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.8em;
    box-sizing: border-box;
    /* margin-top: 2em; */
    margin-bottom: 0.7em;
  }

  .variants {
    list-style: none;
    width: 100%;
    padding: 0;
    margin-bottom: 1.3em;
    span {
      label {
        vertical-align: middle;
      }
      label.disabled {
        color: #cbcbcb;
        cursor: not-allowed;
      }
    }
  }

  input[type="radio"] {
    position: absolute;
    visibility: hidden;
    ~ label {
      /* padding: 0.5em 1em; */
      display: inline-block;
      margin-right: 0.2em;
      margin-bottom: 0.2em;

      padding: 10px 15px 8px 15px;
      border: 1px solid #eee;
      text-transform: none;
      letter-spacing: 1px;
      font-size: calc(var(--typeBaseSize) - 1px);
    }
    :checked ~ label {
      border: 2px solid #000;
      padding: 9px 15px 7px 15px;
    }
  }

  .ratings {
    margin-bottom: 2em;
  }
  .rating_stars {
    margin: 0 auto;
    background-color: #eee;
  }
  button {
    margin-bottom: 1em;
    svg {
      width: 27px;
      vertical-align: middle;
    }
  }
  button.btn_black {
    svg {
      fill: white;
      margin-left: .3em;
    }
  }

  .wishlist_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
  }

  .heart_icon_container {
    width: 25px;
    height: 25px;
    margin: 0em .7em;
  }
  
  
  
  
`;
