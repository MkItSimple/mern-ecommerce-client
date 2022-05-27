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
const AdminNav = () => {
  const { logout } = useApp();
  return (
    <RootDiv>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link href="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/admin/product" className="nav-link">
          Product
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/admin/products" className="nav-link">
          Products
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/admin/brand/brand-create" className="nav-link">
          brand
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/admin/color/color-create" className="nav-link">
          color
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/admin/size/size-create" className="nav-link">
          size
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/admin/coupon" className="nav-link">
          Coupon
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/user/password" className="nav-link">
          Password
        </Link>
      </li>
      <li className="nav-item logout" onClick={logout}>
        <span>Logout</span>
      </li>
    </ul>
  </RootDiv>
  )
}

export default AdminNav


