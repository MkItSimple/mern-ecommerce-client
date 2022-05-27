
import CardActions from "./CardActions";
// import { Image, Product } from "../../app/types";
import { useEffect, useState } from "react";
import { ImageType, Product } from "../../types";
import Image from "next/image";
import { ProductCardStyles } from "./AdminProductCardStyles";


interface AdminProductCardProps {
  product: Product, handleRemove: (slug: string) => void
}

const defaultImage = "https://res.cloudinary.com/ddjrablrh/image/upload/v1649074536/nlggerhhutrpyfwzqyiu.webp"

const AdminProductCard = ({ product, handleRemove }: AdminProductCardProps) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [image1, setImage1] = useState(defaultImage);
  const [image2, setImage2] =  useState(defaultImage);
  const [translateY, setTranslateY] = useState("");
  useEffect(() => {
    setImages(product.images.sort((a: ImageType, b: ImageType) => (a.hover_index > b.hover_index ? 1 : -1)));
  }, [product]);
  
  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  

  useEffect(() => {
    if (typeof window !== 'undefined') {
        // console.log('window.innerHeight', window.innerHeight);
        setTranslateY(window.scrollY >= 200 ? "translateY(110px)" : "")
    }
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      setImage1(images[0] ? images[0].url : defaultImage);
      setImage2(images[1] ? images[1].url : defaultImage);
    }
  }, [images])
  
  // const translateY = window.scrollY >= 200 ? "translateY(110px)" : "";
  return (
    <ProductCardStyles>
      <div className="image_container">

        <div className="image_0_container">
          {<Image src={image1} alt="" layout="fill" objectFit="cover" />}
        </div>
        
       
        <div className="hover_image_container">
          {<Image src={image2} alt="" layout="fill" objectFit="cover" />}
            {/* <Image src={images[1].url} alt="" layout="fill" objectFit="cover"></Image> */}
        </div>
        
        {/* {product.images.length < 1 && <img
          src={
            "https://cdn.shopify.com/s/files/1/0606/6644/6073/products/court_legend_2.0_red_m_1_5_540x.jpg?v=1636183763"
          }
          alt=""
        /> } */}
        
        <div className={product.sale ? "tag sale" : "tag"}></div>
        <div className="brand">{product.brand.name}</div>
        <CardActions product={product} handleRemove={handleRemove} />
      </div>

      <div className="title">{product.title}</div>
      <div className="price_container">
        <span className={product.sale ? "price sale" : "price"}>
          ₱{numberWithCommas(product.price)}
        </span>
        <span
          className={product.sale ? "discount_price sale" : "discount_price"}
        >
          ₱{numberWithCommas(product.discount_price)}
        </span>
        <span className={product.sale ? "save sale" : "save"}>
          Save ₱{numberWithCommas(product.price - product.discount_price)}
        </span>
      </div>
    </ProductCardStyles>
  );
};

export default AdminProductCard;
