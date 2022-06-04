import axios from "axios";
axios.defaults.withCredentials = true;
import { AddressType, CartItemType } from "../types";
// import { AddressType, CartItemType } from "../app/types";

export const userCart = async (cart: CartItemType[], authtoken: string) =>
  await axios.post(
    `${process.env.apiUrl}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken: string) =>
  await axios.get(`${process.env.apiUrl}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken: string) =>
  await axios.delete(`${process.env.apiUrl}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const saveUserAddress = async (authtoken: string, address: AddressType) =>
  await axios.post(
    `${process.env.apiUrl}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );

export const applyCoupon = async (authtoken: string, coupon: string) =>
  await axios.post(
    `${process.env.apiUrl}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createOrder = async (stripeResponse: {
    paymentIntent: any;
    error?: undefined;
}, authtoken: string) =>
  await axios.post(
    `${process.env.apiUrl}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserOrders = async (authtoken: string) =>
  await axios.get(`${process.env.apiUrl}/user/orders`, {
    headers: {
      authtoken,
    },
  });

export const getWishlist = async (authtoken: string) =>
  await axios.get(`${process.env.apiUrl}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });

export const removeWishlist = async (productId: string, authtoken: string) =>
  await axios.put(
    `${process.env.apiUrl}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = async (productId: string, authtoken: string) =>
  await axios.post(
    `${process.env.apiUrl}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCashOrderForUser = async (authtoken: string, COD: string) =>
  await axios.post(
    `${process.env.apiUrl}/user/cash-order`,
    { COD },
    {
      headers: {
        authtoken,
      },
    }
  );
