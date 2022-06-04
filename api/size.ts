import axios from "axios";
axios.defaults.withCredentials = true;

export const getSizesApi = async () =>
  await axios.get(`${process.env.apiUrl}/sizes`);

export const getSizeApi = async (slug: string) =>
  await axios.get(`${process.env.apiUrl}/size/${slug}`);

export const removeSizeApi = async (slug: string, authtoken: string) =>
  await axios.delete(`${process.env.apiUrl}/size/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSizeApi = async (slug: string, name: string, authtoken: string) =>
  await axios.put(`${process.env.apiUrl}/size/${slug}`, {name}, {
    headers: {
      authtoken,
    },
  });

export const createSizeApi = async (name: string, authtoken: string) =>
  await axios.post(`${process.env.apiUrl}/size`, {name}, {
    headers: {
      authtoken,
    },
  });
