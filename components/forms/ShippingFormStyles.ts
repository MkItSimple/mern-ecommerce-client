import styled from "styled-components";
import { device } from "../styles/GlobalStyles";
// import { device } from "../../GlobalStyles";
export const ShippingFormStyles = styled.div`
  padding-bottom: 3em;
  input {
    width: 100%;
    /* margin-bottom: 1em; */
  }
  label {
    display: block;
    margin-top: 1.3em;
    margin-bottom: 0.3em;
  }
  .save_address {
    /* border: 1px solid #eee; */
    width: auto;
    margin-top: 1em;
    margin-bottom: 2em;
  }
  .error {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 0.3em 0.5em;
    background-color: #ffeeee;
    color: #cc3333;
    font-family: "Chewy";
    letter-spacing: 1px;
  }
  @media only screen and ${device.mobileL} {
    button {
      width: 100%;
    }
  }
`;
