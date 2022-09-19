import {getDefaultImage, isValidImage, getImage} from '../util/imageHelpers.js';
import pictures from '../assets/pictures/index.js';

export const buildIcon = (picture) => {
  const icon = new Image();
  icon.src = isValidImage(picture) ? pictures[picture] : getDefaultImage();
  icon.alt = picture;
  icon.classList.add('comment-icon');
  return icon;
};

export const updateIcon = (iconName) => {
  const icon = document.getElementById('commenter-icon');
  icon.src = getImage(iconName) || getDefaultImage();
  icon.alt = iconName;
};
