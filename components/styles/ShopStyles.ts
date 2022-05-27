import styled from "styled-components";
import { device } from "./GlobalStyles";
export const ShopStyles = styled.div`
  .wrapper {
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    padding: 2em 2.5em;
    @media only screen and ${device.laptop} {
      padding: 2em 2em;
    }
    @media only screen and ${device.tablet} {
      padding: 0.7em 1em;
    }
  }

  .left {
    width: 250px;
    box-sizing: border-box;
    padding-right: 1.5em;
    @media only screen and ${device.laptop} {
      width: 200px;
      /* padding-right: 1em; */
    }
    @media only screen and ${device.tablet} {
      display: none;
    }
  }
  .right {
    position: relative;
    flex: 1;
  }
  .products_found, .no_products_found {
    position: absolute;
    top: 1em;
    display: inline-block;
    width: fit-content;
    font-size: var(--fontSizeMedium);

    p {
      font-size: var(--fontSizeMedium);
      text-align: center;
    }
    @media only screen and ${device.tablet} {
    top: 3em;


    }}
  }

  .filter_container {
    display: flex;
    align-items: end;
    justify-content: end;
    box-sizing: border-box;
    margin-bottom: 1em;
    z-index: 5;

    @media only screen and ${device.tablet} {
      position: -webkit-sticky;
      position: sticky; 
      top: 90px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1em;
    }}
  }

  .filter_button {
    display: flex;
    align-items: center;
    span {
      font-size: var(--fontSizeMedium);
    }
    .icon {
      width: 20px;
      height: 20px;
      margin-right: 1em;
      vertical-align: middle;
      fill: var(--colorWhite);
    }
    display: none;
    @media only screen and ${device.tablet} {
      display: block;
    }}
  }

  .sort_button {}

  
  .products_container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1em;
    /* padding: 0em 1em; */

    @media only screen and ${device.desktop} {
    }
    @media only screen and ${device.laptopL} {
    }
    @media only screen and ${device.laptop} {
      /* grid-template-columns: 1fr 1fr; */
    }
    @media only screen and ${device.tablet} {
      padding-top: 0em;
    }
    @media only screen and ${device.mobileL} {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
