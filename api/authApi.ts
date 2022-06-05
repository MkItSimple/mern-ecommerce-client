import axios from "axios";

axios.defaults.withCredentials = true;

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
    {withCredentials: true},
    {
      headers: {
        authtoken
      },
    }
  );
};

export const currentUserApi = async (authtoken: string) => {
  return await axios.post(
    `${process.env.apiUrl}/current-user`,
    {withCredentials: true},
    {
      headers: {
        authtoken
      },
    }
  );
};

export const currentAdminApi = async (authtoken: string) => {
  return await axios.post(
    `${process.env.apiUrl}/current-admin`,
    {withCredentials: true},
    {
      headers: {
        authtoken
      },
    }
  );
};
