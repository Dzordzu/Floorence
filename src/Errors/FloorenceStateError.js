
import FloorenceError from './FloorenceError.js';

export default class FloorenceStateError extends FloorenceError {
  constructor(...args) {
    super(...args);
    this.name = 'FloorenceStateError';
  }
}
