import styled from "styled-components";
import { device } from "../styles/GlobalStyles";
// import { device } from "../../GlobalStyles";
export const CartDrawerStyles = styled.div`
  .drawer {
    background-color: #fff;
    position: fixed;
    top: 0;
    right: 0px;
    z-index: 11;
    height: 100%;
    width: 450px;
    background-color: white;
    @media only screen and ${device.mobileL} {
      width: 100%;
    }
  }
  .header_container {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 1.5em 0em;
    margin: 0em 2em;
    border-bottom: 1px solid #e8e8e1;
    @media only screen and ${device.mobileL} {
      padding: 1em 0em;
    }
  }
  h2 {
    flex: 1;
  }
  .cart_items_container {
    box-sizing: border-box;
    padding: 2em;
    /* max-height: 73vh; */
    max-height: calc(100% - 270px);
    overflow-y: auto;
    margin-bottom: 1em;
  }
`;
