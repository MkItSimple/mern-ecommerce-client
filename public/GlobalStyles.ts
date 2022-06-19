import { createGlobalStyle, css } from "styled-components";

// MIXINS
export const SampleMixins = () => css`
  background: pink;
  border-radius: 5px;
`;

export const TableMixins = () => css`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    background-color: white;
    /* border: 1px solid #eee; */
    border-radius: 5px;
    margin-top: 1.7em;
  }

  td,
  th {
    /* border: 1px solid #dddddd; */
    text-align: left;
    
    /* font-family: "Gotham Light"; */
    font-size: 14px;
    /* color: white; */
  }
  th {
    /* background-color: #797979; */
    background-color: #272C2F;
    
    font-family: "Gotham Light";
    color: white;
    font-weight: 200;
    padding: 1em;
  }
  td {
    font-family: "Gotham Light";
    padding: .7em 1em;
    /* display: flex;
    align-items: center; */
    /* justify-content: center; */
  }
  tr {
      /* border-bottom: 1px solid #e2e2e2; */
  }

  tr:nth-child(even) {
    /* background-color: #e0e5eb; */
    /* background-color: #E0E5EB; */
  }

  td.action {
    width: 50px;
  }

  /* svg {
    width: 20px;
    height: 20px;
    padding: 0em .7em;
    fill: #272C2F;
    &:hover {
        cursor: pointer;
        fill: #797979;
    }
  } */
  .icon_container {
    height: 30px;
    width: 30px;
  }
  tr.whishlist {
    display: grid;
    grid-template-columns: 100px auto 200px;
  }
  /* th.name, td.name {
    max-width: 100px;
    background-color: #eee;
  } */
`;

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "600px",
  tablet: "900px",
  tabletL: "1000px",
  laptop: "1280px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  tabletL: `(max-width: ${size.tabletL})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};

export const GlobalStyles = createGlobalStyle`
    html {
        --familyFallback: sans-serif;
        --familyHeaderPrimary: "Zurich";
        --familyMedium: 'Archivo-Medium';
        --familySemiBold: 'Archivo-SemiBold';
        --familyRegular: 'Gotham Light';

        --fontSizeSmaller: 11px;
        --fontSizeSmall: 12px;
        --fontSizeRegular: 14px; // input regular and label
        --fontSizeMedium: 16px;
        --fontSizeHeaderRegular: 32px;
        --fontSizeHeaderSmall:  23px;
        --fontSizeHeaderLarge:  32px;

        --colorBlack: #272C2F;
        --colorWhite: #fff;
        --colorLightBlack: #000;
        --colorLightWhite: #fff;
        --colorBorder: #e8e8e1;
    }

    ul {
        padding: 0px;
        list-style: none;
    }
    a {
        text-decoration: none;
        color: #000;
    }

    li, span, p, a, label, input, button, div {
        font-family: var(--familyRegular);
        font-size: var(--fontSizeRegular);
        font-family: 'Gotham Book';
    }
    h1, h2, h3, h4 {
        /* font-family: var(--familyHeaderPrimary); */
        font-family: "Zurich";
        text-transform: uppercase;
        font-weight: 500;
    }
    h1 {
        font-size: var(--fontSizeHeaderRegular);
    }
    h2 {
        font-size: var(--fontSizeHeaderSmall);
    }

    .full {
        display: block;
        width: 100%;
    }
    .regular {
        font-size: var(--fontSizeRegular);
        outline: none;
        box-sizing: border-box;
        padding: 8px 10px;
    }
    .big{
        font-size: var(--fontSizeMedium);
        outline: none;
        box-sizing: border-box;
        padding: 13px 20px;
    }
    .uc { text-transform: uppercase; }

    input, select {
        border: 1px solid var(--colorBorder); 
        font-family: 'Gotham Light';
    }

    label {
      font-family: 'Gotham Book';
      display: block;
      margin-bottom: .3em;
    }

    .btn_disabled {
      color: #939393;
      border: 1px solid #eee;
    }

    .btn_black {
        cursor: pointer;
        color: var(--colorWhite);
        background-color: var(--colorBlack);
        box-sizing: border-box;
        border: 1px solid var(--colorBlack);
        text-align: center;
        font-family: "Gotham Book";
        /* padding: .5em 1.3em .7em 1.3em;
        letter-spacing: 1px; */
    }
    .btn_white {
        cursor: pointer;
        color: var(--colorBlack);
        background-color: var(--colorWhite);
        box-sizing: border-box;
        border: 1px solid var(--colorBlack);
        text-align: center;
        font-family: 'Gotham Book';
    }
    .btn_custom {
        cursor: pointer;
        color: var(--colorBlack);
        background-color: var(--colorWhite);
        border: 1px solid var(--colorBorder);
        /* padding: 13px 20px; */
    }
    .btn_no_border {
      border: 1px solid transparent;
      background-color: white;
    }

    
    .icon {
        height: 28px;
        width: 28px;
        fill: var(--colorBlack);
        stroke: var(--colorBlack);
        stroke-width: 3;
        vertical-align: middle;
    }

    .error {
      font-family: 'Gotham Light';
      color: red;
      background-color: pink;
      width: 100%;
      box-sizing: border-box;
      padding: .3em .7em;
      font-size: 14px;
      display: block;
    }
    .page_content_wrapper {
      max-width: 1500px;
      margin: 0 auto;
      padding: 1em 2em;
      display: flex;
      .left {
        width: 270px;
      }
      .right: {
        flex: 1;
      }
    }
`;
