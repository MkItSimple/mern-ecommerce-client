// import { Image } from './../app/types';
import styled from "styled-components";
import { device } from "../public/GlobalStyles";

interface ProductSliderStylesProps {
  imageWidth: number,
  index: number,
  imagesLength: number,
}
export const ProductSliderStyles = styled.div<ProductSliderStylesProps>`
  display: block;
  height: 50vw;
  max-height: 800px;
  width: 100%;
  position: relative;

  @media only screen and ${device.tabletL} {
    height: 100vh;
    max-height: 600px;
  }

  @media only screen and ${device.mobileL} {
    max-height: 470px;
  }

  .images_container {
    height: 100%;
    width: 100%;
    /* position: absolute; */
    top: 0px;
    left: 0px;

    overflow-y: none;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      display: none;
    }
    /* display: flex; */
    
    position: absolute;

    &:hover {
      cursor: zoom-in;
    }

    .brand {
      color: var(--colorWhite);
      background: var(--colorBlack);
      position: absolute;
      top: 30px;
      left: -65px;
      min-width: 206px;
      text-align: center;
      padding: 8px 10px;
      transform: rotate(-45deg);
      font-size: 12px;
      letter-spacing: 1px;
      font-family: "Zurich";
    }

  }

  .overflowing_container {
    height: 100%;
    ${props => props.imagesLength && `width: calc(${props.imagesLength * 100}%);`}
    @media only screen and ${device.tabletL} {
      /* padding: 0em 3em; */
    }

    transform: ${props => props.imageWidth && props.imageWidth ? 'translateX(-'+props.imageWidth * props.index+'px)' : 'translateX(-200px)'};
    transition-duration: .2s;
  }
  .b {
    height: 100%;
    width: calc(100% / ${props => props.imagesLength});
    object-fit: cover;
    position: relative;
    display: inline-block;
  }

  .thumbs_container {
    position: absolute;
    top: 1.3em;
    width: 100%;
    display: flex;
    justify-content: center;
    @media only screen and ${device.tabletL} {
      top: auto;
      bottom: 1.3em;
    }
  }

  .thumbs_overflowing_container {
    /* border: 1px solid #eee; */
    max-width: calc(60px * 6);
    overflow-y: none;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      display: none;
    }
    display: flex;
  }
  .thumb {
    height: 40px;
    width: 40px;
    border: 1px solid transparent;
    object-fit: cover;
    position: relative;
    &:hover {
      cursor: pointer;
      border: 1px solid black;
    }
  }
  .thumb.active {
    border: 1px solid black;
  }
  .zoom_container {
    img {
        max-width: 100%;
    }
    opacity: 0;
    z-index: 10;
  }
`;