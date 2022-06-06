import Image from "next/image";
import React, { useEffect, useState } from "react";

import { HeaderStyles } from "./HeaderStyles";
import { useApp } from "../states/AppContext";
import { useRouter } from "next/router";
import { SearchOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import CartDrawer from "../components/drawers/CartDrawer";
import SearchDrawer from "../components/drawers/SearchDrawer";

const Header = () => {
  const { openCartDrawer, openSearchDrawer, setOpenSearchDrawer, setOpenCartDrawer, cart, user } = useApp();
  const [loginUrl, setLoginUrl] = useState("")
  const router = useRouter();

  useEffect(() => {
    if (user) {
      user.role === 'admin' ? setLoginUrl('/admin/dashboard') : setLoginUrl('/user/history')
    } else {
      setLoginUrl('/login');
    }
  }, [user])
  
  return (
    <>
    {openCartDrawer && <CartDrawer />}
    {openSearchDrawer && <SearchDrawer />}
    <HeaderStyles>
      <div className="wrapper">
        <div className="logo_container" onClick={() => router.replace('/')}>
        <Image src="/images/mern_ecommerce.jpg" alt="Website Logo" layout="fill" objectFit="cover" priority></Image>
      </div>
        <ul>
          <li className="shop" onClick={() => router.replace('/')}>
            Shop
          </li>
          <li onClick={() => router.replace(loginUrl)}>
            <UserOutlined />
          </li>
          <li onClick={() => setOpenSearchDrawer(true)}>
            <SearchOutlined />
          </li>
          {router.pathname !== 'checkout' && <li onClick={() => setOpenCartDrawer(true)} className="cart_icon">
             <ShoppingOutlined />
            {cart.length > 0 && <div className="cart_count">{cart.length}</div>}
          </li>}
        </ul>
      </div>
    </HeaderStyles>
    </>
  );
};

export default Header;
