
import ContentLoaderStatesError from './error.js'

export default class Status {
  constructor(queue) {

    let index = 0;
    let current = queue[index];
    let universalUserError = 'Something is wrong with our linking system. We are really sorry :(';

    let define = () => {
      queue.forEach((status, statusIndex) => {

        /**
         * Creates methods with the name of statuses
         */
        Object.defineProperty(this, status, {
          /**
          *  Checks if the curent status is equal to the name of the function
          *  OR
          *  Sets a new status, but ONLY when the current status is the next in the queue
           * @param  {Boolean} set Determines if the status should be set or get
           * @param  {Object} options See below dor details (1)
           * @return {Boolean}      True if the status is set. False otherwise
           *
           * (1) Options:
           * @prop {Boolean} force Determines if index checking should be done or not
           *
           * @NOTE  We intentionally do not use getters/setters, because of simplicity of the set return value
           * Obviously the setter can return value, but the intelligibility of such a usage is lower
           * In order to prevent this kind of situations it's recommended for us to use function
           */
          value: (set = false, options = {}) => {
            if(set) {
              let previousToStatus = (statusIndex - 1 >= 0 ? statusIndex - 1 : queue.length - 1);
              if((index === previousToStatus) || options.force) {
                index = queue.indexOf(status);
                current = status;
                return true;
              }
              else return false;
            }
            /**
             * Returns result of the comparsion of the current status and status in the name of function
             */
            else {
              return current === status;
            }
          }
        });
      });
    };

    function toInitial() {
      index = 0;
      current = queue[index];
      return true;
    }

    function get() {
      return current;
    }

    function getIndex() {
      return index;
    }

    function before(statusName) {
      let statusIndex = queue.indexOf(statusName);
      if(statusIndex === -1) throw new ContentLoaderStatesError('Status: There is no such a status like ' + statusName);
      return (index < statusIndex);
    }

    function after(statusName) {
      return !(before(statusName) || get() === statusName)
    }

    function getNext() {
      return queue[index+1%queue.length];
    }

    define();
    Object.defineProperty(this, 'toInitial', {value: toInitial});
    Object.defineProperty(this, 'getCurrent', {value: get});
    Object.defineProperty(this, 'current', {get: get});
    Object.defineProperty(this, 'getIndex', {value: getIndex});
    Object.defineProperty(this, 'index', {get: getIndex});
    Object.defineProperty(this, 'getNext', {value: getNext});
    Object.defineProperty(this, 'before', {value: before});
    Object.defineProperty(this, 'after', {value: after});
  }
}
