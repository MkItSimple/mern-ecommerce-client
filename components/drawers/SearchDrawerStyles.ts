import styled from "styled-components";
export const SearchDrawerStyles = styled.div`
  .search_container {
    position: fixed;
    top: 0;
    z-index: 11;
    height: 110px;
    width: 100%;
    background-color: var(--colorWhite);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0em 3em;
  }
  .icon {
    fill: var(--colorWhite);
  }
  input {
    flex: 1;
    border: none;
  }
`;
