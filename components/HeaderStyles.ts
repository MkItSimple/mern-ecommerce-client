import styled from "styled-components";
import { device } from "./styles/GlobalStyles";
export const HeaderStyles = styled.div`
    width: 100%;
    border-bottom: 1px solid #e8e8e1;
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    z-index: 5;

  .wrapper {
    max-width: 1600px;
    margin: 0 auto;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: var(--colorWhite);
    z-index: 5;

    box-sizing: border-box;
    padding: 0em 2em 0em 1.3em;
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and ${device.mobileL} {
      padding: 0em 1em 0em .7em;
    }
  }

  .logo_container {
    display: inline-block;
    height: 70px;
    width: 180px;
    background-color: #eee;
    position: relative;
    margin: 10px 0px;
    @media only screen and ${device.mobileL} {
      height: 50px;
      width: 120px;
    }
  }
  .icon {
    fill: var(--colorWhite);
  }
  ul {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  li {
    margin: 0 0.5em;
    &:hover {
      cursor: pointer;
    }
  }
  .shop {
    background: #f8e71c;
    padding: 10px;
    border-radius: 5px;
    font-family: "Chewy";
      color: #000;
      font-size: 12pt;
      text-transform: uppercase;
      text-decoration: none;
      letter-spacing: 1px;
  }
  .cart_icon {
    position: relative;
    .cart_count {
      position: absolute;
      right: -5px;
      bottom: -10px;
      background-color: #ff4f33;
      color: white;
      height: 27px;
      width: 27px;
      padding-top: .25em;
      border-radius: 50%;
      text-align: center;
      border: 2px solid white;
      font-family: 'Gotham Light';
    }
  }

  .anticon {
    height: 27px;
    width: 27px;
    margin: 0em .3em;
    color: #000;
    
    &:hover {
      color: #858585;
    }
  }
  svg {
    height: 100%;
    width: 100%;
  }
  
`;
