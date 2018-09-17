
import FloorenceError from './../../src/Errors/FloorenceError.js';
import { assert } from 'chai'
import { expect } from 'chai'


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
      let expected = {
        message: test.expected.message || message,
        number: test.expected.number || number,
        userMessage: test.expected.userMessage || userMessage,
      }
      expected.getUserMessage = test.developerMode ? expected.message : (expected.userMessage || 'Whoops... Something went wrong');

      it(`Expecting to catch Floorence Error with proper values #${index}`, function() {
        try {
          throw new FloorenceError(message, {
            number: number,
            userMessage: userMessage,
            developerMode: developerMode
          });
        } catch(error) {
          expect(error.name, 'Wrong error type').to.equal('FloorenceError');
          expect(error.message, 'Message is incorrect').to.equal(expected.message);
          expect(error.number, 'Number is incorrect').to.equal(expected.number);
          expect(error.userMessage, 'User Message is incorrect').to.equal(expected.userMessage);
          expect(error.getUserMessage(), 'getUserMessage returns improper value').to.equal(expected.getUserMessage);
        }
      });

    });



  });
});
