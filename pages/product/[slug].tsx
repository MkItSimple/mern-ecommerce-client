


import { useCallback, useEffect, useState } from "react";
import _, { sampleSize } from "lodash";
import { updateCart} from "../../api/cartApi";
import { toast } from "react-toastify";
import { getProductApi, productStarApi } from "../../api/productApi";
import Header from "../../components/Header";
import { Rating } from "react-simple-star-rating";
import { useRouter } from "next/router";
import { Product, SaleEnum, VariantType } from "../../types";
import { useApp } from "../../states/AppContext";
import { showAverage } from "../../api/rating";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import IconCart from "../../components/svg/Cart";
import { ProductStyles } from "../../components/styles/ProductStyles";
import ProductSlider from "../../components/ProductSlider";
import { GetServerSideProps } from "next";
import axios from "axios";
import IconStar from "../../components/svg/Star";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart} from "@fortawesome/free-solid-svg-icons"
import { addToWishlist } from "../../api/userApi";
import ZoomProduct from "../../components/ZoomProduct";

const ProductPage = ({staticProduct, colors, sizes}: {staticProduct: Product, colors:VariantType[], sizes:VariantType[]}) => {
  // const { setOpenCartDrawer } = useApp();
  const { 
    user, 
    openConfirmationModal , 
    setOpenConfirmationModal, 
    cart,  
    setOpenCartDrawer,
    openZoom,
    addToCart
  } = useApp();

  const router = useRouter();
  const { slug } = router.query

  const [product, setProduct] = useState<Product>(staticProduct);
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const [tooltip, setTooltip] = useState("Click to add");
  const [cartChanged, setCartChanged] = useState(false);

  const setStarHandler = useCallback(
    () => {
      if (product.ratings && user) {
        let existingRatingObject = product.ratings.find(
          (ele) => ele.postedBy.toString() === user._id.toString()
        );
        existingRatingObject && setStar(existingRatingObject.star); // current user's star
      }
    },
    [product.ratings, user],
  )
  
  useEffect(() => {
    setStarHandler()
  }, [setStarHandler]);

  const loadSingleProduct = async () => {
    // slug && getProductApi(slug as string).then((res) => {
    //   setProduct(res.data);
    // });
    const res = await getProductApi(slug as string)
    setProduct(res.data)
  };

 const toggleModal = (value: boolean) => {
    setOpenConfirmationModal(value)
  };

  const RatingComponent = () => {
    return <Rating onClick={onStarClick} ratingValue={star} fillColor="rgb(230, 67, 47)" readonly={false} />
  };

  const onStarClick = async (newRating: number) => {
    setStar(newRating);
    // product?._id && user?.token && productStarApi(product._id, newRating, user?.token).then((res) => {
    //   console.log("rating clicked", res.data);
    //   toast.success(`Thanks for your rating!`);
    //   toggleModal(false);
    //   loadSingleProduct(); // if you want to show updated rating in real time
    // });

    const res = await productStarApi(product._id, newRating, user?.token)
    toast.success(`Thanks for your rating!`);
    toggleModal(false);
    loadSingleProduct(); // if you want to show updated rating in real time
  };

  // If loggedin open rating modal, else redirect to login page
  const handleModal = () => {
    if (user && user.token) {
      toggleModal(true);
    } else {
      router.replace('/login');
    }
  };

  const handleAddToWishlist = async () => {
    // add to wishlist
    // console.log("add to wishlist");

    if (user && user.token) {
      // addToWishlist(product._id, user.token).then((res) => {
      //   // console.log("ADDED TO WISHLIST", res.data);
      //   toast.success("Added to wishlist");
      //   router.push("/user/wishlist");
      // });
      const res = await addToWishlist(product._id, user.token)
      toast.success("Added to wishlist");
      router.push("/user/wishlist");
    } else {
      router.replace('/login');
    }
  };

  const handleAddToCart = (product: Product) => {
    const {_id, title, description, brand, color, size, images, price, discount_price, sale, shipping} = product;
    addToCart({_id, title, description, brand, color, size, images, price, discount_price, sale, quantity: 1, shipping})
    setOpenCartDrawer(true)
    setCartChanged(true);
  };

  useEffect(() => {
    if (cartChanged) {
      updateCart(cart)
    }
  }, [cart, cartChanged]);
  
  return (
    <ProductStyles>
      {openZoom && <ZoomProduct />}
      <Header />
      <div className="product_wrapper">
        <div className="left">
          {product && <ProductSlider
          product={product}
          />}
        
        </div>
        <div className="right">
          <div className="right_wrapper">
            <h1 className="product_name">{product.title}s</h1>
            <div className="price_container">
              <span className={product.sale === SaleEnum.YES ? 'old_price' : ''}>Php {product.price}</span>
              
              {product.sale === SaleEnum.YES && <>
              <span>Php {product.discount_price}</span><span className="save_price">P{product.price - product.discount_price}</span>
              </>}
            </div>

            <div className="variant_header">Available ({product.quantity})</div>
             <div className="variant_header">Sold ({product.sold})</div>
             <div className="variant_header ratings" >
               {product && product.ratings && product.ratings.length > 0 ? (
                  showAverage(product)
                ) : (
                  <div className="text-center pt-1 pb-3">No rating yet</div>
                )}
               </div> 

            <div className="variant_header">Color</div>
            <div className="variants">

              {colors.map((color) => (
              <span key={color._id}>
                <input type="radio" id={color.slug} name={color.slug} disabled={product.color.slug === color.slug ? false : true}/>
                <label htmlFor={color.slug} className={product?.color.slug !== color.slug ? "disabled" : ""}>{color.name}</label>
              </span>
              ))}
            </div>

            <div className="variant_header">Size</div>
            <div className="variants">
              {sizes.map((size) => (
              <span key={size._id}>
                <input type="radio" id={size.slug} name={size.slug} disabled={product?.size.slug === size.slug ? false : true}/>
                <label htmlFor={size.slug} className={product?.size.slug !== size.slug ? "disabled" : ""}>{size.name}</label>
              </span>
              ))}
            </div>

            <div className="btn_black big full wishlist_btn" onClick={handleAddToWishlist}>
              <div>Add to Wishlist</div>
              <div className="heart_icon_container">
                <FontAwesomeIcon icon={faHeart} style={{height: "100%", width: "100%"}} />
              </div>
            </div>

            <button className="btn_white big full" onClick={handleModal}>{user ? <span>Leave rating <IconStar/><IconStar/><IconStar/></span> : "Login to leave rating"}</button>
            {openConfirmationModal && <ConfirmationModal closeModal={() => toggleModal(false)} body={RatingComponent()}/>}

            {product && <button className="btn_black big full add_to_cart" onClick={() => product && handleAddToCart(product)} disabled={product.quantity < 1}>
              {product.quantity < 1 ? "Out of Stock" : <span>Add to cart <IconCart/></span> }
            </button> }
          </div>
        </div>
      </div>
    </ProductStyles>
  );
};

// const getProduct = async () => {
//   const { data } = await axios.get(
//     `http://localhost:3000/api/pokemon?name=${escape(name)}`
//   );
//   return data;
// };

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    // const { openConfirmationModal, openModal, openCart, openCartDrawer, cart } = useApp();
    let productRes = null;
    productRes = params && await axios.get(`${process.env.apiUrl}/product/${params.slug}`);
    const colorsRes = await axios.get(`${process.env.apiUrl}/colors`);
    const sizesRes = await axios.get(`${process.env.apiUrl}/sizes`);

  return {
    props: {
      // products: productsRes.data,
      staticProduct: productRes ? productRes.data : null,
      // brands: brandsRes.data,
      colors: colorsRes.data,
      sizes: sizesRes.data,
    },
  };
}

export default ProductPage;

// https://www.npmjs.com/package/react-simple-star-rating
// https://codesandbox.io/s/react-simple-rating-ts-fzmpu?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.tsx:1818-1830