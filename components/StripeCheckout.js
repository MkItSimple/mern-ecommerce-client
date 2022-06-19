import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../api/stripe";
import { createOrder, emptyUserCart, getUserCart } from "../api/userApi";
import Image from "next/image";

import styled from "styled-components";
import Link from "next/link";
import { useApp } from "../states/AppContext";
import { numberWithCommas } from "../hooks/useFunctions";
const StripeCheckoutStyles = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 1em 1em;
  h1 {
    text-align: center;
  }
  .image_container {
    height: 77px;
    width: 77px;
    background-color: pink;
    position: relative;
    display: inline-block;
    margin-right: 0.5em;
  }
  .totals_container {
    margin-bottom: 1em;
    p,
    div {
      font-size: 18px;
      margin-bottom: 1em;
    }
  }
  form {
    width: 100%;
  }
`;

const StripeCheckout = () => {
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => ({ ...state }));
  // const user = useSelector((state) => state.user.value);
  // const coupon = useSelector((state) => state.user.couponApplied);
  const { user, couponApplied, setCouponApplied, clearCart } = useApp();

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const [products, setProducts] = useState([]);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // console.log("user ", user);
    // console.log("coupon ", couponApplied);
  }, []);

  useEffect(() => {
    if (user) {
      getUserCart(user.token).then((res) => {
        console.log("user cart res", JSON.stringify(res.data, null, 4));
        setProducts(res.data.products);
      });

      createPaymentIntent(user.token, couponApplied).then((res) => {
        // console.log("create payment intent", res.data);
        setClientSecret(res.data.clientSecret);
        // additional response received on successful payment
        setCartTotal(res.data.cartTotal);
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        setPayable(res.data.payable);
      });
    }

    //
  }, [user, couponApplied]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          clearCart();

          // reset coupon to false
          setCouponApplied(false);

          // empty cart from database
          emptyUserCart(user.token);
        }
      });
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    // listen for changes in the card element
    // and display any errors as the custoemr types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <StripeCheckoutStyles>
      <h1>Complete your purchase</h1>
      {products.map((p, index) => (
        <div className="image_container" key={index}>
          <Image src={p.image} layout="fill" objectFit="cover" alt="" />
        </div>
      ))}
      <div className="totals_container">
        {!succeeded && (
          <div>
            {couponApplied && totalAfterDiscount !== undefined ? (
              <p className="alert alert-success">{`Total after discount: $${numberWithCommas(
                totalAfterDiscount
              )}`}</p>
            ) : (
              <p className="alert alert-danger">No coupon applied</p>
            )}
          </div>
        )}
        <div>Total: ${numberWithCommas(cartTotal)}</div>
        <div>
          Total Payables: ${numberWithCommas((payable / 100).toFixed(2))}
        </div>
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.
          <Link href="/user/history">See it in your purchase history.</Link>
        </p>
      </form>
    </StripeCheckoutStyles>
  );
};

export default StripeCheckout;
