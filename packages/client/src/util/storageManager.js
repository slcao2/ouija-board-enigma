const USER_KEY = 'obe-user';

export const saveUserToLocalStorage = (user) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getLocalStorageUser = () => {
  const user = window.localStorage.getItem(USER_KEY);
  try {
    return JSON.parse(user);
  } catch (error) {
    return undefined;
  }
};
