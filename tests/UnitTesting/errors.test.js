
import FloorenceError from './../../src/Errors/FloorenceError.js';
import { assert } from 'chai'


let testing = {
  FloorenceErrors: [
    { number: 10, message: 'MSG', userMessage: 'USR' },
    { number: '11', message: 'MSG', userMessage: 'USR', expected: { number: 11 } },
    { number: 10, message: 123, userMessage: 'USR', expected: { message: '123' } },
    { number: 10, message: 'MSG', userMessage: 1245, expected: { userMessage: '1245' } },
  ],
};


describe('Errors', function() {
  describe('#FloorenceError', function() {

    testing.FloorenceErrors.forEach((test, index) => {

      if(test.expected === undefined) test.expected = {};

      /**
       * Set testing values
       */
      let message = test.message;
      let number = test.number;
      let userMessage = test.userMessage;
      let developerMode = test.developerMode;

      /**
       * Set expected output
       */
      let expMessage = test.expected.message || message;
      let expNumber = test.expected.number || number;
      let expUserMessage = test.expected.userMessage || userMessage;
      let expGetUserMessage = expUserMessage || 'Whoops... Something went wrong';

      it(`Asserting catching Floorence Error with proper values #${index}`, function() {
        try {
          throw new FloorenceError(message, {
            number: number,
            userMessage: userMessage,
            developerMode: developerMode
          });
        } catch(error) {
          assert.strictEqual(error.name, 'FloorenceError', 'Wrong error type');
          assert.strictEqual(error.message, expMessage, 'Messages are not equal');
          assert.strictEqual(error.userMessage, expUserMessage, 'User Messages are not equal');
          assert.strictEqual(error.number, expNumber, 'Numbers are not equal');
          assert.strictEqual(error.getUserMessage(), expGetUserMessage, 'getUserMessage returns improper value');
        }
      });

    });



  });
});
