import styled from "styled-components";
import { device } from "../styles/GlobalStyles";
// import { device } from "../../GlobalStyles";
export const ProductCardStyles = styled.div`
  height: fit-content;
  box-sizing: border-box;
  border: 1px solid #e8e8e1;
  padding-bottom: 1em;
  &:hover {
    .hover_image, .quick_view {
      opacity: 1;
    }
    cursor: pointer;
  }

  .image_container {
    width: 100%;
    object-fit: cover;
    height: 400px;
    position: relative;
    overflow: hidden;

    @media only screen and ${device.desktop} {
      /* height: 330px; */
    }
    @media only screen and ${device.laptopL} {
      height: 300px;
    }
    @media only screen and ${device.laptop} {
      height: 270px;
    }
    @media only screen and ${device.tablet} {
      height: 250px;
    }
    @media only screen and ${device.mobileL} {
      height: 180px;
    }
  }

  .image_component_container {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .hover_image {
    position: absolute;
    top: 0px;
    opacity: 0;
    transition-duration: .3s;
  }

  .brand {
    color: var(--colorWhite);
    background: var(--colorBlack);
    position: absolute;
    top: 27px;
    left: -57px;
    min-width: 206px;
    text-align: center;
    padding: 8px 10px;
    transform: rotate(-45deg);
    font-size: 12px;
    letter-spacing: 1px;
    font-family: "Gotham Light";
    opacity: 1;
    @media only screen and ${device.mobileL} {
      font-size: var(--fontSizeSmaller);
      padding: 3px 7px;
      transform: rotate(-60deg);
      top: 36px;
      left: -73px;
    }
  }
  .sold {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .tag {
    font-size: 12px;
    &::before {
      font-family: "Gotham Light";
      letter-spacing: 2px;
      text-transform: uppercase;

      padding: 7px 9px;
      position: absolute;
      top: 0px;
      right: 0px;
    }
    @media only screen and ${device.mobileL} {
      &::before {
        padding: 5px;
      }
    }}
  }
  .tag.sale {
    &::before {
      content: "Sale";
      background-color: var(--colorBlack);
      color: var(--colorWhite);
    }
  }
  .tag.sold_out {
    &::before {
      content: "Sold out";
      background-color: #eee;
      color: var(--colorBlack);
    }
  }

  .quick_view {
    background-color: var(--colorBlack);
    color: var(--colorWhite);
    font-size: 12px;
    font-family: "Gotham Light";
    letter-spacing: 0.1em;
    text-align: center;
    opacity: 0;
    transition-duration: .3s;
    position: absolute;
    display: block;
    width: calc(100% - 2em);
    bottom: 0em;
    margin: 1em;
    box-sizing: border-box;
    padding: 0.7em;
  }

  .product_name {
    /* text-transform: uppercase; */
    text-align: center;
    font-size: var(--fontSizeSmall);
    letter-spacing: 1px;
    @media only screen and ${device.mobileL} {
      font-size: var(--fontSizeSmaller);
      letter-spacing: 0px;
    }}
  }

  .description_container {
    text-align: center;
    span {
      display: inline-block;
      padding: 0.2em 0.5em;
      font-family: var(--familyRegular);
      font-size: var(--fontSizeSmall);
    }
  }
  .discount_price {
    display: none;
  }
  .discount_price.sale {
    display: inline-block;
  }
  .price.sale {
    text-decoration: line-through;
  }
  .save {
    color: #c20000;
    display: none;
  }
  .save.sale {
    display: inline-block;
  }
`;
