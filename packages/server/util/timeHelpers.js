import moment from 'moment';

export const getElapsedTime = (createTimestamp) => {
  return moment(createTimestamp).fromNow();
};
