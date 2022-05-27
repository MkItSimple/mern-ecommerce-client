import styled from "styled-components";
import { device } from "./styles/GlobalStyles";
export const SubTotalStyles = styled.div`

  .subtotal {
    background-color: #fff;
    width: 100%;
    position: absolute;
    bottom: 0px;
    box-sizing: border-box;
    padding: 2em 2em;
    border-top: 1px solid #e8e8e1;
    @media only screen and ${device.mobileL} {
      padding: 1em 1.5em;
    }
  }
  .subtotal_container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .subtotal_label {
    flex: 1;
    text-align: left;
    text-transform: uppercase;
    font-size: var(--fontSizeSmall);
    letter-spacing: 0.2em;
  }
  .subtotal_value {
    flex: 1;
    text-align: right;
  }
  .shipping_description {
    text-align: center;
    font-size: var(--fontSizeSmall);
    box-sizing: border-box;
    padding: 1em 1em;
    @media only screen and ${device.mobileL} {
      padding: 1em 3em;
    }
  }
  button {
    width: 100%;
    font-size: var(--fontSize);
    /* font-family: var(--familyMedium); */
    font-family: 'Gotham Light';
    letter-spacing: 0.3em;
    margin-bottom: .7em;
  }
`;
