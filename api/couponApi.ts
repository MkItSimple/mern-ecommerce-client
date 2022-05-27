import axios from "axios";

export const getCouponsApi = async () =>
  await axios.get(`${process.env.apiUrl}/coupons`);

export const removeCouponApi = async (couponId: string, authtoken: string) =>
  await axios.delete(`${process.env.apiUrl}/coupon/${couponId}`, {
      headers: {
        authtoken,
      },
    });

interface NewCoupon { name: string, expiry: Date, discount: string }
export const createCouponApi = async (coupon: NewCoupon, authtoken: string) =>
  await axios.post(
    `${process.env.apiUrl}/coupon`,
    { coupon },
        {
      headers: {
        authtoken,
      },
    }
    );


