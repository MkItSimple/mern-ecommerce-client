import axios from "axios";
axios.defaults.withCredentials = true;

export const getColorsApi = async () =>
  await axios.get(`${process.env.apiUrl}/colors`);

export const getColorApi = async (slug: string) =>
  await axios.get(`${process.env.apiUrl}/color/${slug}`);

export const removeColorApi = async (slug: string, authtoken: string) =>
  await axios.delete(`${process.env.apiUrl}/color/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateColorApi = async (slug: string, name: string, authtoken: string) =>
  await axios.put(`${process.env.apiUrl}/color/${slug}`, {name}, {
    headers: {
      authtoken,
    },
  });

export const createColorApi = async (name: string, authtoken: string) =>
  await axios.post(`${process.env.apiUrl}/color`, {name}, {
    headers: {
      authtoken,
    },
  });
