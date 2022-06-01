import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'; const RootDiv = styled.div`
    .image_container {
        height: 400px;
        width: 400px;
        position: relative;
    }
`

const Zoom = () => {
  return (
    <RootDiv>
        <div className='image_container'>
            <Image src={"https://res.cloudinary.com/dcdwu2zss/image/upload/v1650953876/mern_portfolio/c-1650953875338.webp"} layout='fill' objectFit='cover' alt='' />
        </div>
    </RootDiv>
  )
}

export default Zoom