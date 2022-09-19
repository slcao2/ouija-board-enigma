import './style.scss';
import {
  buildPage,
} from './util/pageBuilder.js';
import {getOrCreateClientUser} from './util/userHelper.js';
import {setupWebsocket} from './util/websocketClient.js';

const userPromise = getOrCreateClientUser();
userPromise.then((user) => {
  if (!user) {
    console.error('No client user found. Something went wrong.');
  }
  buildPage();
});

setupWebsocket();
