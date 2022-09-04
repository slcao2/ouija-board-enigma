import axios from 'axios';

const basePrefix = '/users';

export const createUser = (user) => {
  return axios.post(basePrefix, user)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
};
