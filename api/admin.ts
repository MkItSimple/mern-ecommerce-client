import axios from "axios";

export const getOrders = async (authtoken: string) =>
  await axios.get(`${process.env.apiUrl}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId: string, orderStatus: string, authtoken: string) =>
  await axios.put(
    `${process.env.apiUrl}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
