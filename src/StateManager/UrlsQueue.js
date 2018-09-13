
export default class UrlsQueue {
  constructor() {

    let queueElementsLimit = 2;
    let universalUserError = 'Something is wrong with the URL you want to visit';

    let queue = [];


    function validate(url) {
      if(typeof url.real !== 'string') {
        throw new ContentLoaderStatesError('UrlsQueue: url.real has to be a string', universalUserError);
        return false;
      }

      if(typeof url.display !== 'string' && url.display !== null && url.display !== undefined) {
        throw new ContentLoaderStatesError('UrlsQueue: url.display has to be undefined, string or null', universalUserError);
        return false;
      }

      return true;
    }


    function push(url) {
      if(validate(url)) {
        if(queue.length < queueElementsLimit) queue.push(url);
        else queue[queueElementsLimit - 1] = url;

        return queue.length - 1;
      }
      else return false;
    }

    function replace(url, index=0) {
      if(validate(url)) {
        queue[index] = url;
        return true;
      }
      return false;
    }

    function toNext() {
      queue.splice(0, 1);
      return queue.length > 0 ? true : false;
    }

    function getCurrent() {
      return queue[0];
    }

    function getNext() {
      return queue[1];
    }

    function getAll() {
      return queue;
    }


    Object.defineProperty(this, 'push', {value: push});
    Object.defineProperty(this, 'replace', {value: replace});
    Object.defineProperty(this, 'toNext', {value: toNext});
    Object.defineProperty(this, 'current', {get: getCurrent});
    Object.defineProperty(this, 'getCurrent', {value: getCurrent});
    Object.defineProperty(this, 'next', {get: getNext});
    Object.defineProperty(this, 'getNext', {value: getNext});
    Object.defineProperty(this, 'all', {get: getAll});
    Object.defineProperty(this, 'getAll', {value: getAll});

  }
}
