import axios from "axios";
import { NewProduct, UpdatedProduct } from "../types";

export const createProductApi = async (product: NewProduct, authtoken: string) =>
  await axios.post(`${process.env.apiUrl}/product`, product, {
    headers: {
      authtoken,
    },
  });

export const updateProductApi = async (slug: string, product: UpdatedProduct, authtoken: string) =>
  await axios.put(`${process.env.apiUrl}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });


export const getProductsByCountApi = async (count: number) =>
  await axios.get(`${process.env.apiUrl}/products/${count}`);

export const removeProductApi = async (slug: string, authtoken: string) =>
  await axios.delete(`${process.env.apiUrl}/product/${slug}`,{
      headers: {
        authtoken,
      },
    });

export const getProductApi = async (slug: string) =>
  await axios.get(`${process.env.apiUrl}/product/${slug}`);

export const getProductsApi = async (sort: string, order: number, page: number) =>
  await axios.post(`${process.env.apiUrl}/products`, {
    sort,
    order,
    page,
  });

// export const getProductsCountApi = async () =>
//   await axios.get(`${process.env.apiUrl}/products/total`);

export const productStarApi = async (productId: string, star: number, authtoken: string) =>
  await axios.put(
    `${process.env.apiUrl}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    });

export const getRelated = async (productId: string) =>
  await axios.get(`${process.env.apiUrl}/product/related/${productId}`);

interface ArgType {
  brands: string[],
  colors: string[],
  sizes: string[],
  price: number[];
}
export const getProductsByFilter = async (arg: ArgType) =>
  await axios.post(`${process.env.apiUrl}/search/filters`, arg);

// export const getHighestPrice = async () =>
//   await axios.get(`${process.env.apiUrl}/price/highest`);

export const showSession = async () =>
  await axios.get(`${process.env.apiUrl}/showsession`,{
    headers: {
      withCredentials: true,
    },
  });

export const updateSession = async () =>
  await axios.post(`${process.env.apiUrl}/updatesession`,{
    headers: {
      withCredentials: true,
    },
  });