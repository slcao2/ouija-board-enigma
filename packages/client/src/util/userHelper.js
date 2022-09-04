import {createUser} from '../api/users';
import {getRandomImageName} from './imageHelpers';
import {getLocalStorageUser, saveUserToLocalStorage} from './storageManager';

const NAME_LIST = ['Alden', 'Aiden', 'Zane', 'Champ', 'Casper', 'Quincy',
  'Blaze', 'Baron', 'Trapper', 'Tyler', 'Harvey', 'Leo', 'Morgan', 'Belle',
  'Savannah', 'Duchess', 'Hailey', 'Sugar', 'Nori', 'Avery', 'Poppy', 'Kiki',
  'Lola', 'Leia',
];

const generateRandomName = () => (
  NAME_LIST[Math.floor(Math.random() * NAME_LIST.length)]
);

const generateUser = () => {
  const user = {
    name: generateRandomName(),
    picture: getRandomImageName(),
  };
  return createUser(user);
};

export const getOrCreateClientUser = () => {
  const localStorageUser = getLocalStorageUser();
  if (localStorageUser) {
    return Promise.resolve(localStorageUser);
  } else {
    return generateUser()
        .then((user) => {
          saveUserToLocalStorage(user);
          return user;
        });
  }
};
