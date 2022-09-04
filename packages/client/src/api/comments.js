import axios from 'axios';

const basePrefix = '/comments';

export const getComments = () => {
  return axios.get(basePrefix)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
};

export const postComment = (body) => {
  return axios.post(basePrefix, body)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
};
