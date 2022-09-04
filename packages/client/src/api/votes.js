import axios from 'axios';

const basePrefix = '/votes';

export const putVote = (userId, commentId) => {
  return axios.put(`${basePrefix}/users/${userId}/comments/${commentId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
};

export const deleteVote = (userId, commentId) => {
  return axios.delete(`${basePrefix}/users/${userId}/comments/${commentId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
};

export const getVotes = () => {
  return axios.get(basePrefix)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
};
