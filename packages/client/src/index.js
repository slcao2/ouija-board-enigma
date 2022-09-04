import './style.scss';
import {
  updateCommenterIcon,
  buildCommentsSection,
  addCommentFormEventListener,
} from './util/pageBuilder';
import {getOrCreateClientUser} from './util/userHelper';

const userPromise = getOrCreateClientUser();
userPromise.then((user) => {
  if (!user) {
    console.error('No client user found. Something went wrong.');
  }
  addCommentFormEventListener(user.userId);
  updateCommenterIcon(user.picture);
});

buildCommentsSection();
