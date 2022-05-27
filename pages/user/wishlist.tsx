import React, { useCallback, useEffect, useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { useApp } from "../../states/AppContext";
import { getWishlist, removeWishlist } from "../../api/userApi";
import { ProductType } from "../../types";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash} from "@fortawesome/free-solid-svg-icons"
import { DashboardStyles } from "../../components/styles/DashboardStyles";
import Header from "../../components/Header";
import { useRouter } from "next/router";

const Wishlist = () => {
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);
  const { user } = useApp();

  const loadWishlist = useCallback(
    () => {
        getWishlist(user.token).then((res) => {
            // console.log(res);
            setWishlist(res.data.wishlist);
        })
    },
    [user],
  )
  
  const handleRemove = (productId: string) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  useEffect(() => {
    if (user) {
      loadWishlist();
    }
  }, [user, loadWishlist]);

  return (
      <>
      <Header />
    <DashboardStyles>
      <div className="content_wrapper">
        <div className="left">
            <UserNav />
        </div>
        <div className="right">
            <h1>My Wishlist</h1>
            <div className="wrapper">
              <table>
            <tr className="whishlist">
              <th className="name">Image</th>
              <th>Product Name</th>
              <th>Delete</th>
            </tr>
            {wishlist.map((p: ProductType, index) => (
              <tr key={p._id} onClick={() => router.push(`/product/${p.slug}`)} className="whishlist whishlist_item">
                <td className="name">
                  <div className="image_tag_container">
                  <Image src={p.images[0].url} alt="" layout="fill" objectFit="cover"/>
                  </div>
                </td>
                <td>{p.title}</td>
                <td className="action">
                  {/* <IconDelete onClickFunction={() => handleRemove(i.slug)}/> */}
                  <div className="icon_container" onClick={() => handleRemove(p.slug)}>
                    <FontAwesomeIcon icon={faTrash} style={{height: "100%", width:"100%"}}/>
                  </div>
                </td>
              </tr>
            ))}
          </table>
                
            </div>
        </div>    
      </div>
    </DashboardStyles>
      </>
  );
}

export default Wishlist