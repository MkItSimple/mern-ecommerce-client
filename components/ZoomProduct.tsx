import React from 'react'
import Image from 'next/image'
import { CloseOutlined } from "@ant-design/icons";
import styled from 'styled-components';
import { useApp } from '../states/AppContext';
import { device } from '../public/GlobalStyles';
 const ZoomProductStyles = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100%;
    z-index: 10;
    background-color: white;
    
    .zoom_image_container {
      height: 100%;
      max-width: 800px;
      margin: 0 auto;
      position: relative;
      cursor: zoom-out;

      /* @media only screen and ${device.laptop} {
        width:70%;
      } */

      /* @media only screen and ${device.tabletL} {
        width:70%;
      } */

      .close {
        position: absolute;
        right: 1em;
        top: 1em;
        z-index: 10;
        font-size: 1.3em;
        cursor: pointer;
        background-color: #0A0502;
        padding: 0.5em;
        border-radius: 50%;
        color: white;
      }
    }


    
`

const ZoomProduct = () => {
  const { setOpenZoom, setZoomUrl, zoomUrl } = useApp();

  const exit = () => {
    setOpenZoom(false); setZoomUrl("");
  };
  return (
    <ZoomProductStyles>
        <div className="zoom_image_container" onClick={exit}>
          <CloseOutlined className='close' onClick={exit}/>
          {/* <span className='close' onClick={exit}>Close</span> */}
          
          <Image src={zoomUrl} layout='fill' objectFit='cover' alt='' />
        </div>
    </ZoomProductStyles>
  )
}

export default ZoomProduct
/*
https://res.cloudinary.com/dcdwu2zss/image/upload/v1650889162/mern_portfolio/1650889159964.jpg

*/ 