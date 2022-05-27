import axios from "axios";

export const createPaymentIntent = (authtoken, coupon) =>
  axios.post(
    `${process.env.apiUrl}/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
