import pictures from '../assets/pictures/index.js';

const VALID_IMAGES = Object.keys(pictures);

export const getRandomImageName = () => (
  VALID_IMAGES[Math.floor(Math.random() * VALID_IMAGES.length)]
);

export const getImage = (name) => (pictures[name]);

export const getDefaultImage = () => (pictures[getRandomImageName()]);

export const isValidImage = (image) => (VALID_IMAGES.includes(image));
