
/**
 * In order to extend error the class has to declare methods
 * within the constructor @see MDN
 *
 * @NOTE In errors we need no privacy
 */

/**
 * @type {Object}
 */
export default class FloorenceError extends Error {

  /**
   * @param {String} message
   * @param {Object} [options={}] Handles additional information about:
   * - error number
   * - user message
   * - development mode
   */
  constructor(message, options = {}) {
    super(message);


    this.name = 'FloorenceError';
    /**
     * Defaults for each class
     * @type {Object}
     */
    this.default = {
      number:  0,
      userMessage: 'Whoops... Something went wrong',
      developerMode: false,
    };

    /**
     * We should assign proper values
     */
    this.userMessage = String(options.userMessage) || this.default.userMessage;
    this.number = parseInt(options.number) || this.default.number;
    this.developerMode = Boolean(options.developerMode) || this.default.developerMode;


    Object.defineProperty(this, 'getUserMessage', {
      value: () => {
        if(this.developerMode) return this.message;
        return this.userMessage;
      }
    });

  }
}
