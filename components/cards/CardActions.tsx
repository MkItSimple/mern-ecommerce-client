import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../../types";
// import IconDelete from "../svg/IconDelete";
// import IconUpdate from "../svg/IconUpdate";

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const RootDiv = styled.div`
  position: absolute;
  bottom: 5px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #eee; */

  .icons_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .anticon {
    height: 27px;
    width: 27px;
    margin: .2em 1em;
    color: #c3c3c3;
    &:hover {
      color: #202124;
    }
  }
  svg {
    height: 100%;
    width: 100%;
  }
`;



// const svgStyles = {
//   padding: "1em",
//   height: "1.7em", 
//   width: "1.7em", 
//   color: "#bdbdbd",
// }
interface CardActionsProps { product: Product, handleRemove: (slug: string) => void }
const CardActions = ({ product, handleRemove }: CardActionsProps) => {
  const router = useRouter();
  return (
    <RootDiv>
      <div className="icons_wrapper">
        {/* <IconUpdate onClickFunction={() => router.push(`/admin/product/${product.slug}`)}/>
      <IconDelete onClickFunction={() => handleRemove(product.slug)}/> */}
      {/* <FontAwesomeIcon icon={faPen} onClick={() => router.push(`/admin/product/${product.slug}`)} style={svgStyles}/>
       */}
      {/* <FontAwesomeIcon icon={faTrash} onClick={() => handleRemove(product.slug)} style={svgStyles}/> */}
      {/* <ShoppingOutlined onClick={() => handleRemove(product.slug)}/> */}
      <EditOutlined onClick={() => router.push(`/admin/product/${product.slug}`)}/>
      <DeleteOutlined onClick={() => handleRemove(product.slug)}/>
      </div>
    </RootDiv>
  );
};

export default CardActions;
