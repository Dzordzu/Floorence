
import { Status } from './Status.js';
import { UrlsQueue } from './UrlsQueue.js';

/**
 * Handles info about loader state (status, realUrl etc.)
 * And yes. It's not a joke
 *
 * @version 2.0.0-beta
 * @type {Object}
 */
function StateManager() {

  /**
   * Freeze an object in order to keep StateManager safe and clean
   */
  return Object.freeze({
    status: new Status(),
    urlsQueue: new UrlsQueue
  });
};

export default StateManager;
