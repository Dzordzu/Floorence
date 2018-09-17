
import { assert } from 'chai'
import { expect } from 'chai'
import Status from './../../src/StateManager/Status.js';
import UrlsQueue from './../../src/StateManager/UrlsQueue.js';
import FloorenceStateError from './../../src/Errors/FloorenceStateError.js';

/**
 * Predefine status and urlsQueue
 */
let status;
let urlsQueue;

/**
 * Prepare data for testing
 */
let testing = {
  statuses: {

    /**
     * Test names of the queue elements
     */
    naming: {
      /**
       * Each error starts with "Invalid name: ${name}. " then errorMessage is added to it
       */
      errorMessages: {
        namingConvention: 'The name of the status must start from the letter or the underscore and has to be alphanumeric (latin alphabet, underscores are also permitted)',
        reservedKeywords: 'This is our reserved keyword'
      },
      improperNames: {
        namingConvention: ['idle-state', 'green!', '34yellow', 'sth@poll', '!green'],
        reservedKeywords: ['getNext', 'getCurrent', 'current', 'next', 'toInitial', 'before', 'after']
      },
      properNames: ['yellow34'],
    },


    /**
     * Define queue for the ordered tests
     */
    queue: ['idle', 'showing', 'shown', 'processing', 'processed', 'hiding', 'hidden'],

    /**
     * Checks if queues (partial sequences) that do not belong to the queue (main sequence) are returning false
     * This ensures us that if the queue if 1->2->3->4 the 1->3 and 2->1 and 3->1 are improper and rejected
     */
    improperQueues: [
      ['idle', 'shown'],
      ['idle', 'showing', 'shown', 'processed'],
      ['idle', 'idle'],
      ['showing', 'idle']
    ]
  },


  urlsQueue: {

  }
}

describe('StateManager - Statuses', function() {

  describe('# Naming', function() {
    /**
     * Foreach test name...
     */
    Object.keys(testing.statuses.naming.improperNames).forEach((testName) => {
      describe(`## ${testName}`, function() {
        /**
         *  prepare tests...
         */
        testing.statuses.naming.improperNames[testName].forEach((name, index) => {
          it(`Expecting wrong name of the queue element #${index}`, function() {

            /**
             * with proper message...
             */
            let errMsg = function(name) {
              return `Invalid name: ${name}. ${testing.statuses.naming.errorMessages[testName]}`;
            }

            expect(() => {
              status = new Status([name]);
            }, "Something is wrong with the thrown error").to.throw(FloorenceStateError, errMsg(name));

          });
        });
      });
    });
  });


  describe('# Ordered tests', function() {
    before(function() {
      status = new Status(testing.statuses.queue);
    })

    /**
     * Check current status
     */
    it(`current and getCurrent() return "${testing.statuses.queue[0]}"`, function() {
      expect(status.current, 'current has got improper value').to.equal(testing.statuses.queue[0]);
      expect(status.getCurrent(), 'getCurrent() has got improper value').to.equal(testing.statuses.queue[0]);
    });

    /**
     * Check next status
     */
    it(`next and getNext() return "${testing.statuses.queue[1]}"`, function() {
      expect(status.next, 'next has got improper value').to.equal(testing.statuses.queue[1]);
      expect(status.getNext(), 'getNext() has got improper value').to.equal(testing.statuses.queue[1]);
    });

    /**
     * Check 1->3
     */
    it(`${testing.statuses.queue[2]}(true) shouldn't change status to "${testing.statuses.queue[2]}"`, function() {
      expect(status[testing.statuses.queue[2]](true), 'Returns improper value').to.be.false;
      expect(status.getCurrent(), 'Status is improper').to.equal(testing.statuses.queue[0]);
    });

    /**
     * Check 1->2
     */
    it(`${testing.statuses.queue[1]}(true) changing status to "${testing.statuses.queue[1]}" and returning true`, function() {
      expect(status[testing.statuses.queue[1]](true), 'Returns improper value').to.be.true;
      expect(status.getCurrent(), 'Status is improper').to.equal(testing.statuses.queue[1]);
    });

    /**
     * Check if status has changed (using named function)
     */
    it(`${testing.statuses.queue[1]}() returning true`, function() {
      expect(status[testing.statuses.queue[1]]()).to.be.true;
    });

    /**
     * Check if status has changed (using named function)
     */
    it(`${testing.statuses.queue[0]}() returning false`, function() {
      expect(status[testing.statuses.queue[0]]()).to.be.false;
    });

    /**
     * Set to initial
     */
    it(`toInitial() changes status to "${testing.statuses.queue[0]}"`, function() {
      expect(status.toInitial(), 'Returns improper value').to.be.undefined;
      expect(status.getCurrent(), 'Status is improper').to.equal(testing.statuses.queue[0]);
    });

    /**
     * 1->3 by force
     */
    it(`${testing.statuses.queue[2]}(true, true) moving directly to the "${testing.statuses.queue[2]}"`, function() {
      expect(status[testing.statuses.queue[2]](true, true), 'Return value is improper').to.be.true;
      expect(status.getCurrent(), 'Status is improper').to.equal(testing.statuses.queue[2]);
    });

    /**
     * Check if 2<3, 3==3, and 3<4 (Really. It's that simple)
     */
    it(`before(x)`, function() {
      expect(status.before(testing.statuses.queue[1]), 'Returns improper value, when after').to.be.false;
      expect(status.before(testing.statuses.queue[2]), 'Returns improper value, when equals').to.be.false;
      expect(status.before(testing.statuses.queue[3]), 'Returns improper value, when before').to.be.true;
    });

    /**
     * Check if 2<3, 3==3, and 3<4 (Really. It's that simple)
     */
    it(`after(x)`, function() {
      expect(status.after(testing.statuses.queue[1]), 'Returns improper value, when after').to.be.true;
      expect(status.after(testing.statuses.queue[2]), 'Returns improper value, when equals').to.be.false;
      expect(status.after(testing.statuses.queue[3]), 'Returns improper value, when before').to.be.false;
    });
  });

  describe('# Errors', function() {
    it('before() and after()', function() {

      before(function() {
        status = new Status(testing.statuses.queue);
      });

      expect(status.before.bind(this, 'abracadabra')).to.throw(FloorenceStateError, 'There is no such a status like abracadabra');
      expect(status.after.bind(this, 234)).to.throw(FloorenceStateError, 'There is no such a status like 234');
    });
  });
});

/**
 * @TODO Finish changing assert to expect
 */

describe('StateManager - UrlsQueue', function() {
  describe('# Ordered tests', function() {

    before(function() {
      urlsQueue = new UrlsQueue;
    });

    it('setLimit(3), getLimit()', function() {
      assert.strictEqual(urlsQueue.setLimit(3), undefined, 'setLimit() returning wrong value');
      assert.strictEqual(urlsQueue.getLimit(), 3, 'Wrong limit');
    });

    it('all and getAll()', function() {
      assert.deepEqual(urlsQueue.all, [], 'How did you do this? all returns improper value');
      assert.deepEqual(urlsQueue.getAll(), [], 'You are a talented human... getAll() returns improper value');
    });

    it('current and getCurrent()', function() {
      assert.strictEqual(urlsQueue.current, undefined, 'HAHAHAHHA. You couldn\'t check the value of the first element in the queue via current');
      assert.strictEqual(urlsQueue.getCurrent(), undefined, 'getCurrent() is in a wrong. As you are');
    });

    it('push("lol/xD")', function() {
      assert.strictEqual(urlsQueue.push('lol/xD'), 0, 'push() returns improper value');
      assert.deepEqual(
        urlsQueue.getCurrent(),
        {real: 'lol/xD', display: 'lol/xD'},
        'The urls wasn\'t added to the queue'
      );
    });

    it('push({real: "http://test.pl"}), getNext()', function() {
      assert.strictEqual(urlsQueue.push({real: "http://test.pl"}), 1, 'push() returns improper value');
      assert.deepEqual(urlsQueue.getNext(), {real: "http://test.pl"}, 'The urls wasn\'t added to the queue or getNext() doesn\'t work');

      assert.deepEqual(
        urlsQueue.getAll(),
        [
          {real: 'lol/xD', display: 'lol/xD'},
          {real: "http://test.pl"},
        ],
        'The urls wasn\'t added to the queue or something is wrong with getAll()'
      );
    });

    it('push({real: "/well/well/well", display: "ss"})', function() {
      assert.strictEqual(urlsQueue.push({real: "/well/well/well", display: "ss"}), 2, 'push() returns improper value');
      assert.deepEqual(
        urlsQueue.getAll(),
        [
          {real: 'lol/xD', display: 'lol/xD'},
          {real: "http://test.pl"},
          {real: "/well/well/well", display: "ss"}
        ],
        'The urls wasn\'t added to the queue or something is wrong with getAll()'
      );
    });

    it('push("x") - should replace third value', function() {
      assert.strictEqual(urlsQueue.push("x"), 2, 'push() returns improper value');
      assert.deepEqual(
        urlsQueue.getAll(),
        [
          {real: 'lol/xD', display: 'lol/xD'},
          {real: "http://test.pl"},
          {real: "x", display: "x"}
        ],
        'The urls wasn\'t added to the queue or something is wrong with getAll()'
      );
    });

    it('replace("xs", 1)', function() {
      assert.strictEqual(urlsQueue.replace("xs", 1), true, 'replace() returns improper value');
      assert.deepEqual(urlsQueue.getNext(), {real: "xs", display: "xs"}, 'The urls wasn\'t added to the queue or getNext() doesn\'t work');
      assert.deepEqual(
        urlsQueue.getAll(),
        [
          {real: 'lol/xD', display: 'lol/xD'},
          {real: "xs", display: "xs"},
          {real: "x", display: "x"}
        ],
        'The urls wasn\'t added to the queue or something is wrong with getAll()'
      );
    });

    it('toNext()', function() {
      assert.strictEqual(urlsQueue.toNext(), true, 'toNext() returns improper value');
      assert.deepEqual(urlsQueue.getAll(),
      [
        {real: "xs", display: "xs"},
        {real: "x", display: "x"}
      ],
      'The urls wasn\'t moved to next');
    });

    it('setLimit(1) - should remove elements that exceed the limit', function() {
      urlsQueue.setLimit(1);
      assert.strictEqual(urlsQueue.getLimit(), 1, 'Wrong limit');
      assert.deepEqual(urlsQueue.getAll(), [{real: 'xs', display: 'xs'}], 'Something is wrong. getAll() or setLimit() has to be fixed');
    });
    it('push("goodBoi") - the last element is simultaneously the first one', function() {
      assert.strictEqual(urlsQueue.push("goodBoi"), 0, 'push() returns improper value');
      assert.deepEqual(urlsQueue.getAll(), [{real: 'goodBoi', display: 'goodBoi'}], 'The urls wasn\'t added to the queue or something is wrong with getAll()');
    });

    it('replaceOnLimitExceed(false), push()', function() {
      assert.strictEqual(urlsQueue.replaceOnLimitExceed(false), undefined, 'Wrong returned value');
      assert.strictEqual(urlsQueue.push('test'), false, 'push() is returning improper value');
      assert.deepEqual(urlsQueue.getCurrent(), {real: 'goodBoi', display: 'goodBoi'}, 'Simply - it does NOT work');
    });




  });
})
