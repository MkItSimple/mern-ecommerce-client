import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import { device } from "./GlobalStyles";
// import { device } from "../GlobalStyles";
export const CheckoutStyles = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding-top: 2em;
  display: grid;
  grid-template-columns: 4fr 3fr;
  /* border: 1px solid #e8e8e1; */
  @media only screen and ${device.tablet} {
    display: flex;
    flex-direction: column-reverse;
    padding-top: 0em;
  }

  .shipping_header {
    font-size: calc(var(--fontSizeMedium) + 2px);
    /* margin-top: 1em; */
    margin-bottom: 1em;
  }
  .left {
    box-sizing: border-box;
    padding: 0em 2em;
    border-right: 1px solid #e8e8e1;
    @media only screen and ${device.tablet} {
      /* margin-top: 1em; */
      padding: 0em 4em;
    }
    @media only screen and ${device.mobileL} {
      padding: 0em 2em;
    }
  }
  .right {
    box-sizing: border-box;
    padding: 0em 2em;
    margin-bottom: 2em;
    @media only screen and ${device.tablet} {
      padding: 1em 4em;
    }
    @media only screen and ${device.mobileL} {
      padding: 0em 2em;
    }
  }
  .col1 {
    grid-template-columns: 1fr;
  }
  .col2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
  }

  /* .accordion {
  }
  .order-summary-toggle__icon {
    margin-right: 1em;
  }
  .accordion_header {
    display: flex;
    align-items: center;
    padding: 1em 0em;
    border-bottom: 1px solid var(--colorBorder);
    margin-bottom: 1em;
  }
  .header_text {
    flex: 1;
  }
  .header_price {
    font-size: var(--fontSizeMedium);
  }
  .bi-chevron-down {
    vertical-align: middle;
    margin-left: 0.5em;
  }
*/
  .accordion__content {
    h2 {
      text-transform: none;
      margin-bottom: 0em;
    }
  } 
  .accordion {
    /* font-family: "Archivo" */
    max-width: 100%;
    overflow: hidden;
  }

  .accordion__label {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e8e8e1;
    box-sizing: border-box;
    padding: 14px 0px;
    margin: 0;
    display: none;
    @media only screen and ${device.tablet} {
      display: flex;
    }
  }
  .header_text {
    /* font-family: "Archivo" */
    font-weight: 400;
    /* font-size: var(--fontSizeSmaller); */
    /* letter-spacing: 0.2em; */
    /* text-transform: uppercase; */
    /* flex: 1; */
    margin-right: 0.5em;
  }
  .accordion_price {
    flex: 1;
    font-size: var(--fontSizeMedium);
    text-align: right;
  }
  .accordion__label:hover {
    cursor: pointer;
  }
  .order-summary-toggle__icon {
    margin-right: 1em;
  }
  .bi {
    content: "";
    transition: all 0.3s ease;
    color: black;
  }
  .accordion__content {
    background-color: #ffffff;
    line-height: 1.6;
    font-size: 0.85em;
    padding: 0px 0px;
    overflow: hidden;
    max-height: 1000px;
    transition: all 0.3s ease;
    @media only screen and ${device.tablet} {
      max-height: 0px;
    }
  }
  .accordion__input:checked ~ .accordion__content {
    display: block;
    padding: 14px 0px;
    max-height: 1000px;
  }

  .accordion__input {
    display: none;
  }
  .accordion__input:checked ~ .accordion__label {
    .bi {
      transform: rotate(0.5turn);
      transition: all 0.3s ease;
    }
  }

  .place_order {
    margin-bottom: .3em;
  }

  .total_container {
    margin-top: 1em;
    margin-bottom: 2em;
    
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: .3em; 
    }
    .discounted_price {
      background-color: #9ff9e1;
      color: #054861;
      padding: .5em 1em;
      .label, .price {
        font-family: 'Chewy';
        font-size: 1.7em;
      }
    }

    .label, .price {
      font-family: 'Chewy';
      font-size: 1.7em;
    }
    .label {
      flex: 1;
    }
  }
  .provide_address {
    font-family: 'chewy';
    font-size: 1.7em;
    padding: .5em 0em;
  }
`;

export const DiscountFormStyles = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    flex: 1;
    letter-spacing: 1px;
  }
  button {
    letter-spacing: 1px;
  }
`;
