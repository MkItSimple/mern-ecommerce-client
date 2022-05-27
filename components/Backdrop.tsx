import styled from "styled-components";
const BackdropStyles = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5cf;
  span {
    display: block;
    height: 100%;
    width: 100%;
  }
`;
const Backdrop = ({ closeSomething }: { closeSomething: () => void }) => {
  return (
    <BackdropStyles>
      <span onClick={closeSomething}></span>
    </BackdropStyles>
  );
};
export default Backdrop;
