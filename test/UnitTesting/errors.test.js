
import FloorenceError from './../../src/Errors/FloorenceError.js';
import { assert } from 'chai'

describe('Errors', function() {
  describe('#FloorenceError', function() {
    it('Should catch Floorence Errors', function() {

      let number = 10;
      let message = 'This is test message';
      let userMessage = 'Another one';

      try {
        throw new FloorenceError(message, {
          number: 10,
          userMessage: userMessage
        });
      } catch(error) {
        assert.strictEqual(error.name, 'FloorenceError', 'Wrong error type');
        assert.strictEqual(error.message, message, 'Messages are not equal');
        assert.strictEqual(error.userMessage, userMessage, 'User Messages are not equal');
        assert.strictEqual(error.number, number, 'Numbers are not equal');
        assert.strictEqual(error.getUserMessage(), userMessage, 'Numbers are not equal');
      }
    });

  });
});
