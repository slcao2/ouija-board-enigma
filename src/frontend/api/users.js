import axios from 'axios';
import {usersBaseUrl} from '../../server/util/routeConstants';

const basePrefix = usersBaseUrl;

export const createUser = (user) => {
  return axios.post(basePrefix, user)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
};
