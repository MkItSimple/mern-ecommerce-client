import axios from "axios";

// axios.defaults.withCredentials = true;

export const getBrandsApi = async () =>
  await axios.get(`${process.env.apiUrl}/brands`, { withCredentials: true });

export const getBrandApi = async (slug: string) =>
  await axios.get(`${process.env.apiUrl}/brand/${slug}`, { withCredentials: true });


export const createBrandApi = async (name: string, authtoken: string) =>
  await axios.post(`${process.env.apiUrl}/brand`, {name}, {
    headers: {
      authtoken,
    },
  });

export const updateBrandApi = async (slug: string, name: string , authtoken: string) =>
  await axios.put(`${process.env.apiUrl}/brand/${slug}`, name, {
    headers: {
      authtoken,
    },
  });

export const removeBrandApi = async (slug: string , authtoken: string) =>
  await axios.delete(`${process.env.apiUrl}/brand/${slug}`, {
    headers: {
      authtoken,
    },
  });




