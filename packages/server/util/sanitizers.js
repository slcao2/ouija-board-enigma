export const convertUndefinedToNull = (value) => {
  if (value === undefined) {
    return null;
  }
  return value;
};
