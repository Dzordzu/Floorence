
export default class UrlsQueue {
  constructor() {

    let limit = 1;
    let queue = [];
    let replaceOnLimitExceed = true;


    function setLimit(lim) {
      queue.splice(1);
      limit = lim;
    }

    function setReplaceOnLimitExceed(value) {
      replaceOnLimitExceed = value;
    }

    function validate(url) {
        if(typeof url !== 'object') {
          return false;
        }

        if(typeof url.real !== 'string') {
          //throw new ContentLoaderStatesError('UrlsQueue: url.real has to be a string', universalUserError);
          return false;
        }

        if(typeof url.display !== 'string' && url.display !== undefined) {
          //throw new ContentLoaderStatesError('UrlsQueue: url.display has to be undefined, string or null', universalUserError);
          return false;
        }
      return true;
    }


    function strToObj(url) {
      if(typeof url === 'string') {
        url = {
          real: url,
          display: url
        };
      }
      return url;
    }


    function push(url) {

      url = strToObj(url);

      if(validate(url)) {
        if(queue.length < limit) queue.push(url);
        else {
          if(replaceOnLimitExceed) queue[limit - 1] = url;
          else return false;
        }
        return queue.length - 1;
      }
      else return false;
    }

    function replace(url, index=0) {

      url = strToObj(url);

      if(validate(url)) {
        queue[index] = url;
        return true;
      }
      return false;
    }

    function toNext() {
      queue.shift();
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

    Object.defineProperty(this, 'setLimit', {value: setLimit});
    Object.defineProperty(this, 'getLimit', {value: ()=>limit});
    Object.defineProperty(this, 'replaceOnLimitExceed', {value: setReplaceOnLimitExceed});
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
