import axios from "axios";
axios.defaults.withCredentials = true;

export const createPaymentIntent = async (authtoken, coupon) =>
  await axios.post(
    `${process.env.apiUrl}/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

// export const createPaymentIntent = (authtoken, coupon) =>
//   axios.post(
//     `${process.env.apiUrl}/create-payment-intent`,
//     { couponApplied: coupon },
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );
