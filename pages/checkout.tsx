import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateCart } from "../api/cartApi";
import { applyCoupon, emptyUserCart, getUserCart } from "../api/userApi";
import CheckoutItems from "../components/CheckoutItems";
import LogoutForm from "../components/forms/LogoutForm";
import ShippingForm from "../components/forms/ShippingForm";
import Header from "../components/Header";
import { CheckoutStyles, DiscountFormStyles } from "../components/styles/CheckoutStyles";
import { numberWithCommas } from "../hooks/useFunctions";
import { useApp } from "../states/AppContext";

const Checkout = () => {
  const router = useRouter();
  const { user, clearCart, setCouponApplied, addressSaved, setAddressSaved } = useApp(); 
  const [emptyAddress, setEmptyAddress] = useState(false)

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  useEffect(() => {
    user && getUserCart(user.token).then((res) => {
      // console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });//

    user?.address?.street && setAddressSaved(true);
  }, [user, setAddressSaved]);

  const emptyCart = () => {
    // remove from session cookie
    updateCart([]).then((res) => {
      // console.log("server cart updated", res.data);
    });

    // remove from global state (context or redux or zustand)
    clearCart();

    // remove from backend DB
    user && emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const applyDiscountCoupon = () => {
    // console.log("send coupon to backend", coupon);
    user && applyCoupon(user.token, coupon).then((res) => {
      // console.log("RES ON COUPON APPLIED", res.data);
      if (res.data.err) {
        setTotalAfterDiscount(0);
        toast.error(res.data.err);
        setDiscountError(res.data.err);
        // dispatch(setCouponApplied(false))~
        setCouponApplied(false)
      } else {
        toast.success('Coupon Applied');
        setTotalAfterDiscount(res.data);
        // dispatch(setCouponApplied(true));
        setCouponApplied(true);
      }
    });
  }

  const setCouponHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setCoupon(e.currentTarget.value);
    setDiscountError("");
  };

  // useEffect(() => {
  //   console.log("checkout products ", products);
  // }, [products])
  
  const ChevronDown = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chevron-down"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
        />
      </svg>
    );
  };

  const ShowApplyCoupon = () => {
     return (
      <DiscountFormStyles>
      <input
        onChange={setCouponHandler}
        value={coupon}
        type="text"
        className="big"
      />
      <button onClick={applyDiscountCoupon} className="btn_black big">
        Apply
      </button>
      
      </DiscountFormStyles>
    )
  };

  const PlaceOrderButton = () => {
    if (addressSaved) {
      return <button className={`big place_order full btn_black`} onClick={()=> router.push("/payment")} disabled={!addressSaved || !products.length}>Place Order</button>
    } else {
      return <div className="provide_address">Please provide your shipping address first before placing your order.</div>
    }

    // {!user.address ? (
    //             <div className="provide_address">Please provide your address firstbefore placing your order.</div>
    //           ) : (
    //             <button className={`big place_order full btn_black`} onClick={()=> router.push("/payment")} disabled={!user.address.street || !products.length}>Place Order</button>
    //           )}
  };

  return (
    <>
    <Header />
    <CheckoutStyles>
      <div className="left">
        <div className="shipping_header">Contact Information</div>
        <LogoutForm />
        <div className="shipping_header">Shipping address</div>
        {user && <ShippingForm user={user} />}
      </div>
      <div className="right">
        <div className="accordion">
          <div>
            <input
              type="checkbox"
              name="example_accordion"
              id="section1"
              className="accordion__input"
            />
            <label htmlFor="section1" className="accordion__label">
              <svg
                width="20"
                height="19"
                xmlns="http://www.w3.org/2000/svg"
                className="order-summary-toggle__icon"
              >
                <path d="M17.178 13.088H5.453c-.454 0-.91-.364-.91-.818L3.727 1.818H0V0h4.544c.455 0 .91.364.91.818l.09 1.272h13.45c.274 0 .547.09.73.364.18.182.27.454.18.727l-1.817 9.18c-.09.455-.455.728-.91.728zM6.27 11.27h10.09l1.454-7.362H5.634l.637 7.362zm.092 7.715c1.004 0 1.818-.813 1.818-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817zm9.18 0c1.004 0 1.817-.813 1.817-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817z"></path>
              </svg>
              <span className="header_text">Show order summary</span>
              <ChevronDown />
              <span className="accordion_price">₱{total}</span>
            </label>
            <div className="accordion__content">
              {products.length > 0 ? <CheckoutItems products={products} /> : <p>Cart is empty.</p> }
              {/* <pre>{JSON.stringify(products, null, 4)}</pre> */}
              

              <h2>Got Coupon?</h2>
              
              <ShowApplyCoupon/>
              {discountError && <p className="error">{discountError}</p>}
              <div className="total_container">
                <div><span className="label">Cart Total</span><span className="price">₱ {numberWithCommas(total)} </span></div>
                {totalAfterDiscount > 0 && 
                <div className="discounted_price">
                  <span className="label"> Discount Applied! Total Payable:</span><span className="price"> ₱ {numberWithCommas(totalAfterDiscount)} </span>
                </div> 
                }
                {/* {true && 
                <div className="discounted_price">
                  <span className="label"> Discount Applied! Total Payable:</span><span className="price"> ₱ {numberWithCommas(34000)} </span>
                </div> 
                } */}
              </div>
              {/* ${user.address.street ? "btn_black": ""} */}
              {/* {user && <button className={`big place_order full ${user.address.street ? "btn_black": "btn_disabled"}`} disabled={user.address.street == "" || !products.length} onClick={()=> router.push("/payment")}>Place Order</button> } */}
              {/* {!user.address ? (
                <div className="provide_address">Please provide your address firstbefore placing your order.</div>
              ) : (
                <button className={`big place_order full btn_black`} onClick={()=> router.push("/payment")} disabled={!user.address.street || !products.length}>Place Order</button>
              )} */}
              <PlaceOrderButton />
              
              <button className="btn_black big full" onClick={emptyCart}>Empty Cart</button>
            </div>
          </div>
        </div>
      </div>
    </CheckoutStyles>
    </>
  );
};

export default Checkout;
