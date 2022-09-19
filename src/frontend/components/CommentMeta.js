export const buildCommentMeta = (name, elapsedTime) => {
  const username = document.createElement('span');
  username.innerText = name;
  username.classList.add('username');

  const dot = document.createElement('span');
  dot.innerHTML = '\u00B7';
  dot.classList.add('dot');

  const timestamp = document.createElement('span');
  timestamp.innerText = elapsedTime;
  timestamp.classList.add('timestamp');

  const metaContainer = document.createElement('div');
  metaContainer.classList.add('meta-container');
  metaContainer.append(
      username, dot, timestamp,
  );

  return metaContainer;
};
