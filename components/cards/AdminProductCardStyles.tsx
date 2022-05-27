import styled from 'styled-components'; export const ProductCardStyles = styled.div`
display: block;
  text-align: center;
  box-sizing: border-box;
  position: relative;
  height: 23vw;
  cursor: pointer;
  /* background-color: #eee; */
  border: 1px solid transparent;
  object-fit: cover;

  &:hover {
    border: 1px solid #e8e8e1;
    .quick_view {
      opacity: 1;
    }
    .img_1 {
      opacity: 1;
    }
  }

  @media only screen and (max-width: 1280px) {
    height: 25vw;
  }
  @media only screen and (max-width: 800px) {
    height: 35vw;
  }

  
  .image_container {
    position: relative;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 85%;
    &:hover {
      .hover_image_container {
        opacity: 1;
      }
    }
  }

  .image_0_container {
    position: relative;
    height: 100%;
    width: 100%;
  }


  .hover_image_container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    opacity: 0;
    transition: opacity .5s;
    span {
      height: 100%;
      width: 100%;
    }
  }

  
  .quick_view {
    width: calc(100% - 2em);
    margin: 0 1em;
    padding: 8px;
    /* margin: 5px; */
    box-sizing: border-box;
    position: absolute;
    bottom: 5px;
    background-color: #000;
    color: #fff;
    font-weight: 200;
    font-size: calc(var(--typeBaseSize) - 2px);
    letter-spacing: 0.2em;
    opacity: 0;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .img_1 {
    position: absolute;
    top: 0px;
    opacity: 0;
  }
  .title {
    text-transform: uppercase;
    padding: 5px 0px;
  }
  .price_container {
    span {
      margin: 0px 3px;
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
  .tag {
     font-family: "Gotham Light";
     letter-spacing: 1px;
    &::before {
      font-size: 12px;
      padding: 7px 7px 7px 9px;
      position: absolute;
      top: 0px;
      right: 0px;
    }
  }
  .tag.sale {
    &::before {
      content: "Sale";
      background-color: #000;
      color: #fff;
    }
  }
  .tag.sold_out {
    &::before {
      content: "Sold out";
      background-color: #eee;
      color: #000;
    }
  }
  .brand {
    color: #fff;
    background: #000;
    position: absolute;
    top: 27px;
    left: -60px;
    min-width: 206px;
    text-align: center;
    padding: 8px 10px;
    transform: rotate(-45deg);
    font-size: 12px;
    letter-spacing: 1px;
    font-family: "Gotham Light";
  }
`