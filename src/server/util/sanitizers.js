const convertUndefinedToNull = (value) => {
  if (value === undefined) {
    return null;
  }
  return value;
};

module.exports = {
  convertUndefinedToNull,
};
