import styled from "styled-components";
import { device } from "./styles/GlobalStyles";
export const SortingSelectionStyles = styled.div`
  .select {
    position: relative;
    width: 230px;
    border: 1px solid #e8e8e1;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-color: var(--colorWhite);
    /* padding: 14px 20px; */
    z-index: 2;

    @media only screen and ${device.tablet} {
        width: 100%;
        flex: 1;
    }}
    span {
      flex: 1;
      text-align: left;
      margin-right: 1em;
      font-size: var(--fontSizeMedium);
    }
  }
  .select.open {
    .sorting_list {
      display: block;
    }
  }

  .sorting_input {
    position: absolute;
    box-sizing: border-box;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    /* display: none; */
  }
  ul {
    border: 1px solid #e8e8e1;
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
    text-align: left;
    display: block;
    padding: 0.3em 1em;
    box-sizing: border-box;
    font-family: var(--familyRegular);
    letter-spacing: 1px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .sorting_list {
    position: absolute;
    top: 40px;
    left: -1px;
    width: 100%;
    display: none;
    background-color: var(--colorWhite);
  }

  .bi {
      width: 20px;
      height: 20px;
    }
`;
