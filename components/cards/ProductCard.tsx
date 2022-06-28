import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { numberWithCommas } from "../../hooks/useFunctions";
import { ImageType, Product } from "../../types";
import { ProductCardStyles } from "./ProductCardStyles";

const ProductCard = ({ product }: {product: Product}) => {
  const router = useRouter();
  const [images, setImages] = useState<ImageType[]>([])
  useEffect(() => {
    setImages(product.images.sort((a: ImageType, b: ImageType) => (a.hover_index > b.hover_index ? 1 : -1)));
    // console.log("product ", product);
  }, [product]);
  return (
    <ProductCardStyles>
      {/* <Link href={`/product/${product.slug}`} passHref> */}
      <div onClick={() => router.push(`/product/${product.slug}`)}>
        <div className="image_container">
          <div className="image_component_container">
            <Image src={product.images[0].url ? product.images[0].url : ""} alt="" layout="fill" objectFit="cover" priority />
          </div>
          <div className="image_component_container hover_image">
            <Image src={product.images[1].url ? product.images[1].url : ""} alt="" layout="fill" objectFit="cover" priority />
          </div>
          <span className="brand">{product.brand.name}</span>
          <span className={`tag ${product.sale === "Yes" ? "sale" : ""}`}></span>
          <span className="quick_view">Quick View</span>
          <span className="sold">Sold ({product.sold}) {product.sale}</span>
        </div>
        <div className="product_name">{product.title}</div>
        <div className="description_container">
          <span className={`price ${product.sale === "Yes" ? "sale" : ""}`}>
            ₱{numberWithCommas(product.price)}
          </span>

          {product.sale === "Yes" && <span className='discount_price'>₱{numberWithCommas(product.discount_price)}</span>}
          
          {product.sale === "Yes" && 
          <span className='save'>
            Save ₱{numberWithCommas(product.price - product.discount_price)}
          </span>}
        </div>
      </div>
      {/* </Link> */}
    </ProductCardStyles>
  );
};

export default ProductCard;
/*
<Link href={`/product/${product.slug}`}>
      <div className="image_container">
        <span className="brand">{product.brand.name}</span>
        <span className={product.sale ? "tag sale" : "tag"}></span>
        <span className="quick_view">Quick View</span>
      </div>
      <div className="product_name">{product.title}</div>
      <div className="description_container">
        <span className={`price ${product.sale ? "sale" : ""}`}>
          ₱{numberWithCommas(product.price)}
        </span>

        <span className={`discount_price ${product.sale ? "sale" : ""}`}>
          ₱{numberWithCommas(product.discount_price)}
        </span>

        <span className={`save ${product.sale ? "sale" : ""}`}>
          Save ₱{numberWithCommas(product.price - product.discount_price)}
        </span>
      </div>
      </Link>
*/
