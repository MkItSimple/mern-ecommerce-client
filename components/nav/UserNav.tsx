import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useApp } from "../../states/AppContext";
const RootDiv = styled.nav`
  display: block;
  font-family: "Archivo";
  /* margin: 2em; */
  padding-right: 1em;

  li {
    font-family: "Archivo";
    text-transform: uppercase;
    -webkit-letter-spacing: 0.3em;
    -moz-letter-spacing: 0.3em;
    -ms-letter-spacing: 0.3em;
    letter-spacing: 0.3em;
    font-size: 12px;
    text-align: left;

    border-bottom: 1px solid #eee;
  }
  .nav-link, span, a {
    display: block;
    padding: 1em 0em;
    font-family: "Archivo"
    font-weight: 400;
    font-size: 12px;
    letter-spacing: .3em;
    text-transform: uppercase;
    color: #2b2b2b;
    &:hover {
      /* background-color: #eee; */
      text-decoration: underline;
    }
  }
  .logout {
    span {
    background-color: black;
    color: white;
    box-sizing: border-box;
    padding: 1em;
    }
  }
`;

const UserNav = () => {
  const { logout } = useApp();
  return (
    <RootDiv>
      <ul className="nav flex-column">
        <li>
          <Link href="/user/history" className="nav-link">
            History
          </Link>
        </li>
        <li>
          <Link href="/user/wishlist" className="nav-link">
            Wishlist
          </Link>
        </li>
        <li className="nav-item logout" onClick={logout}>
          <span>Logout</span>
        </li>
      </ul>
    </RootDiv>
  )
}

export default UserNav;
