import React from "react";
import styled from "styled-components";
const LoadingStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 20;

.container
{
    position: relative;
    top: 30%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container .ring
{
    position: relative;
    width: 150px;
    height: 150px;
    margin: -30px;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top: 4px solid #24ecff;
    animation: animate 4s linear infinite;
}
@keyframes animate
{
    0%
    {
        transform: rotate(0deg);
    }
    100%
    {
        transform: rotate(360deg);
    }
}
.container .ring::before
{
    content: '';
    position: absolute;
    top: 12px;
    right: 12px;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background: #24ecff;
    box-shadow: 0 0 0 5px #24ecff33,
    0 0 0 10px #24ecff22,
    0 0 0 20px #24ecff11,
    0 0 20px #24ecff,
    0 0 50px #24ecff;
}
.container .ring:nth-child(2)
{
    animation: animate2 4s linear infinite;
    animation-delay: -1s;
    border-top: 4px solid transparent;
    border-left: 4px solid #93ff2d;
}
.container .ring:nth-child(2)::before
{
    content: '';
    position: absolute;
    top: initial;
    bottom: 12px;
    left: 12px;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background: #93ff2d;
    box-shadow: 0 0 0 5px #93ff2d33,
    0 0 0 10px #93ff2d22,
    0 0 0 20px #93ff2d11,
    0 0 20px #93ff2d,
    0 0 50px #93ff2d;
}
@keyframes animate2
{
    0%
    {
        transform: rotate(360deg);
    }
    100%
    {
        transform: rotate(0deg);
    }
}
.container .ring:nth-child(3)
{
    animation: animate2 4s linear infinite;
    animation-delay: -3s;
    position: absolute;
    top: -66.66px;
    border-top: 4px solid transparent;
    border-left: 4px solid #e41cf8;
}
.container .ring:nth-child(3)::before
{
    content: '';
    position: absolute;
    top: initial;
    bottom: 12px;
    left: 12px;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background: #e41cf8;
    box-shadow: 0 0 0 5px #e41cf833,
    0 0 0 10px #e41cf822,
    0 0 0 20px #e41cf811,
    0 0 20px #e41cf8,
    0 0 50px #e41cf8;
}
.container p
{
    position: absolute;
    color: #fff;
    font-size: 1.7em;
    font-family: "Gotham Light";
    bottom: -80px;
    letter-spacing: 0.15em;
}
`;
type LoadingProps = {
    message?: string | undefined
}
const Loading = ({message}: LoadingProps) => {
  return (
    <LoadingStyles>
      {/* <div className="loader">Loading. . .</div> */}

      <div className="container">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <p>{message && message}</p>
    </div>

    </LoadingStyles>
  );
};

export default Loading;


