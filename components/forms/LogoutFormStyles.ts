import styled from "styled-components";
export const LogoutFormStyles = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  
  /* justify-content: center; */

  .logout_column_1 {
  }
  .logout_column_2 {
    flex: 1;
    
  }

  .bi-person-circle {
    height: 50px;
    width: 50px;
    color: #91999d;
  }
  .email,
  .logout {
    display: block;
    padding: 0.2em 1em;
    box-sizing: border-box;
    &:hover {
      cursor: pointer;
    }
  }
`;
