import axios from "axios";

axios.defaults.withCredentials = true;

export const getCart = async () =>
  await axios.get(`${process.env.apiUrl}/get-cart`, {
    headers: {
      withCredentials: true,
    },
  });

export const updateCart = async (cart) =>
  await axios.post(
    `${process.env.apiUrl}/update-cart`,
    { cart },
    {
      headers: {
        withCredentials: true,
      },
    }
  );
