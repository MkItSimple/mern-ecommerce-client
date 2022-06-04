import axios from "axios";

// export const createOrUpdateUserApi = async (authtoken: string) => {
//   return await axios.post(
//     `${process.env.apiUrl}/create-or-update-user`,
//     {},
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );
// };

export const createOrUpdateUserApi = async (authtoken: string) => {
  return await axios.post(
    `${process.env.apiUrl}/create-or-update-user`,
    {
      headers: {
        authtoken,
        withCredentials: true,
      },
    }
  );
};

export const currentUserApi = async (authtoken: string) => {
  return await axios.post(
    `${process.env.apiUrl}/current-user`,
    {
      headers: {
        authtoken,
        withCredentials: true,
      },
    }
  );
};

export const currentAdminApi = async (authtoken: string) => {
  return await axios.post(
    `${process.env.apiUrl}/current-admin`,
    {
      headers: {
        authtoken,
        withCredentials: true,
      },
    }
  );
};
