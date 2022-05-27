// import 'react-medium-image-zoom/dist/styles.css'
import { useEffect, useRef, useState } from "react";
import { ImageType, Product } from "../types";
import { useApp } from "../states/AppContext";
import { ProductSliderStyles } from './ProductSliderStyles';
import Image from 'next/image';

const ProductSlider = ({ product }: { product: Product }) => {
  const thumbsOverflow = useRef<HTMLDivElement>(null);
  const imagesOverflow = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const thumb = useRef<HTMLImageElement>(null);

  const [scrollX, setScrollX] = useState(1);
  // const [scrollY, setScrollY] = useState(0);
  const [imageWidth, setimageWidth] = useState(0);
  const [imagesThumb, setImagesThumb] = useState<ImageType[]>([]);
  const { openZoom, zoom} = useApp();

  const onThumbClicked = (index: number) => {
    setScrollX(index + 1);
  };

  useEffect(() => {
    if(thumb.current) {
      const single_thumb_width = thumb.current.offsetWidth - 10;
      const double_thumb_width = thumb.current.offsetWidth * 3 + 20;
      thumbsOverflow.current?.scrollTo({
        top: 0,
        left: scrollX * single_thumb_width - double_thumb_width,
        behavior: "smooth",
      });
    }
  }, [scrollX]);

  const handleResize = () => {
    imageRef.current && setimageWidth(imageRef.current.offsetWidth);
  };
  // const exitZoom = () => {
  //   openZoom(false)
  // };

  useEffect(() => {

    setImagesThumb(product.images.sort((a: ImageType, b: ImageType) => (a.hover_index > b.hover_index ? 1 : -1)));
    
    imagesOverflow.current?.scrollTo({
      top: 0,
      left: imagesOverflow.current?.offsetWidth * 1,
      behavior: "smooth",
    });
    imageRef.current && setimageWidth(imageRef.current.offsetWidth);
    window.addEventListener('resize', handleResize)
  }, [product.images]);

  return (
    <>
    <ProductSliderStyles
      imageWidth={imageWidth - 1}
      index={scrollX - 1}
      imagesLength={product.images.length}
    >
      <div className="images_container">
        <div className="overflowing_container" ref={imagesOverflow}> 
           {product.images &&
            product.images.map((image, index) => (
              <div key={index} className='b' ref={imageRef}>
                <Image src={image.url} alt="Product Image" layout='fill' objectFit='cover'/>
              </div>
            ))}
        </div>
        <span className="brand">{product?.brand.name}</span>
      </div>
      <div className="thumbs_container">
        <div className="thumbs_overflowing_container" ref={thumbsOverflow}>
          {imagesThumb &&
            imagesThumb.map((image, index) => (
            <div key={index} className={scrollX === index + 1 ? "thumb active" : "thumb"} onClick={() => onThumbClicked(index)}>
                <Image src={image.url} alt="" layout='fill' objectFit='cover'/>
            </div>
            
            ))}
        </div>
      </div>
    </ProductSliderStyles>
    </>
  );
};

export default ProductSlider;