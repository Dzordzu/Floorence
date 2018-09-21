
import { defaultsDeep } from 'lodash'

class Floorence {

  constructor(options = {}) {

    this.options = defaultsDeep(options, defaults.Floorence);

    /**
     * Barba.js style
     */
    this.Pjax = Pjax;
    this.Transition = Transition;
    this.Cache = Cache;
    this.Dispatcher = Dispatcher;
    this.StateManager = StateManager;
  }

  /**
   * Checks if browser supports Pjax
   */
  supports() {}
  /**
   *  Aliases for floorence.Pjax.start() and floorence.Pjax.end()
   */
  start() {}
  stop() {}
  /**
   * Force Pjax to load URL
   * It also shows loader using floorence.transition.show method
   */
  loadUrl() {}
  /**
   * [handleResponse description]
   * @return {[type]} [description]
   */
  handleResponse() {}
  /**
   * Apply Floorence for the loaded elements
   * Internally it just use stop() and then start()
   */
  refresh() {}
  /**
   * Perform some tasks AFTER handleResponse() is called
   */
  onLoad() {}
  /**
   * Stop pjax
   * It also closes loader using floorence.transition.close method
   */
  cancel() {}



}
module.export = Floorence;
