import styled from "styled-components";
import { device } from "../styles/GlobalStyles";
export const FilterDrawerStyles = styled.div`
  .drawer {
    position: fixed;
    top: 0;
    left: 0px;
    z-index: 11;
    height: 100%;
    width: 450px;
    background-color: white;

    @media only screen and ${device.laptop} {
        width: 370px;  
    }}
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
      padding: 0em 0em;
    }

    .icon {
      &:hover {
        cursor: pointer;
      }
    }
  }
  h2 {
    flex: 1;
  }
  .cart_items_container {
    box-sizing: border-box;
    padding: 2em;
    max-height: 73vh;
    overflow-y: auto;
    @media only screen and ${device.mobileL} {
      padding: 0em 2em;
    }
  }
`;
