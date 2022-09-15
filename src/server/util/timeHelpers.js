const moment = require('moment');

const getElapsedTime = (createTimestamp) => {
  return moment(createTimestamp).fromNow();
};

module.exports = {
  getElapsedTime,
};
