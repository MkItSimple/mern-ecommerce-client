import styled from "styled-components";
// import { AbsoluteCenter } from "./Misinx";
const tt = ".2s";
export const FilterFormStyles = styled.div`
.hide {
  display: none;
}

    // Price Slider Styles Start
  .MuiSlider-root {
    padding: 8px 0px;
    width: 92%;
    left: 7px;
  }
  .price_range_label {
    display: flex;
  }
  .lowest_price {
    flex: 1;
    text-align: left;
  }
  .highest_price {
    flex: 1;
    text-align: right;
  }
  .MuiSlider-thumb {
    width: 16px;
    height: 16px;
    display: flex;
    outline: 0;
    position: absolute;
    box-sizing: border-box;
    /* margin-top: -4px; */
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    align-items: center;
    /* margin-left: -1px; */
    border-radius: 50%;
    justify-content: center;
    border: 1px solid white;
    color: #000;
    :hover {
      box-shadow: none;
    }
  }
  .MuiSlider-rail {
    background: #e1e1e1;
    height: 7px;
  }
  .MuiSlider-track {
    color: #000;
    height: 7px;
  }
// Price Slider Styles End



  // Custom Checkbox
  .form_input_wrapper {
    margin-bottom: 10px;
  }

  .custom-checkbox {
    display: none;
    margin-top: 2em;

    + label {
      display: flex;
      font-family: "Gotham Light"
      font-weight: 400;
      font-size: 14px;
      font-size: 13px;
      letter-spacing: .2em;
      padding-bottom: 1px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
      

      .tag__checkbox {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        width: 16px;
        height: 16px;
        cursor: pointer;
        position: relative;
        border: 1px solid #e8e8e1;
        display: flex;
        align-items: center;
        justify-content: center;

        &::before {
          content: "";
          opacity: 0;
          display: block;
          width: 80%;
          height: 80%;
          background-color: #000;
          transition(opacity ${tt});
        }
      }

      .tag__text {
        display: inline-block;
        color: #000;
      }
    }

    :checked + label {
      span {
        &::before {
          opacity: 1;
        }
      }
    }

    &:disabled + label {
      opacity: 0.5;

      &,
      span {
        cursor: default;
      }
    }
  }
  .selected_variants {
    width: 100%;
    li {
      display: flex;
      background: #000;
      margin-bottom: .2em;
    }
    .text {
      flex: 1;
      padding: .8em 1em;
      box-sizing: border-box;
      color: #fff;
      font-family: "Gotham Light";
      text-transform: uppercase;
      letter-spacing: .3em;
      font-size: 12px;

    }
    .removeFilter {
      padding: .8em 1em;
      box-sizing: border-box;
      color: #fff;
      font-family: "Gotham Light";
      font-weight: 400;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .3em;
      
      &:hover {
        cursor: pointer;
      }
    }
  }


  // New Styles
  .accordion {
    font-family: "Archivo"
    max-width: 100%;
    overflow: hidden;
  }

  .accordion__label {
    border-bottom: 1px solid #e8e8e1;
    box-sizing: border-box;
    padding: 14px 0px;
    margin: 0;
  }

  .accordion__label {
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header_text {
    font-family: "Archivo"
      font-weight: 400;
      font-size: 12px;
      letter-spacing: .2em;
      text-transform: uppercase;
    flex: 1;
  }
  .accordion__label:hover {
    cursor: pointer;
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
    max-height: 0px;
    transition: all 0.3s ease;
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
`;
