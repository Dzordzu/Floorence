
import { assert } from 'chai'
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
    improperNames: {
      namingConvention: ['idle-state', 'green!', '34yellow', 'sth@poll', '!green'],
      reservedKeywords: ['getNext', 'getCurrent', 'current', 'next', 'toInitial', 'before', 'after']
    },
    properNames: ['yellow34'],

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

    describe('## Naming convention', function() {
      testing.statuses.improperNames.namingConvention.forEach((name, index) => {
        it(`Asserting wrong name of the queue element #${index}`, function(){
          assert.throws(() => {
            status = new Status([name]);
          }, FloorenceStateError, `Invalid name: ${name}. The name of the status must start from the letter or the underscore and has to be alphanumeric (latin alphabet, underscores are also permitted)`
        )});
      });
    });

    describe('## Reserved keywords', function() {
      testing.statuses.improperNames.reservedKeywords.forEach((name, index) => {
        it(`Asserting wrong name of the queue element #${index}`, function(){
          assert.throws(() => {
            status = new Status([name]);
          }, FloorenceStateError, `Invalid name: ${name}. This is our reserved keyword`
        )});
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
    it(`Asserting that both current and getCurrent() return "${testing.statuses.queue[0]}"`, function() {
      assert.strictEqual(status.current, testing.statuses.queue[0], 'current has got improper value');
      assert.strictEqual(status.getCurrent(), testing.statuses.queue[0], 'getCurrent() has got improper value');
    });

    /**
     * Check next status
     */
    it(`Asserting that both next and getNext() return "${testing.statuses.queue[1]}"`, function() {
      assert.strictEqual(status.next, testing.statuses.queue[1], 'next has got improper value');
      assert.strictEqual(status.getNext(), testing.statuses.queue[1], 'getNext() has got improper value');
    });

    /**
     * Check 1->3
     */
    it(`Asserting ${testing.statuses.queue[2]}(true) NOT changing status to "${testing.statuses.queue[2]}" and returning false`, function() {
      assert.strictEqual(
        status[testing.statuses.queue[2]](true),
        false, 'Returns improper value');
      assert.strictEqual(status.getCurrent(), testing.statuses.queue[0], 'Status is improper');
    });

    /**
     * Check 1->2
     */
    it(`Asserting ${testing.statuses.queue[1]}(true) changing status to "${testing.statuses.queue[1]}" and returning true`, function() {
      assert.strictEqual(status[testing.statuses.queue[1]](true),
      true, 'Returns improper value');
      assert.strictEqual(status.getCurrent(), testing.statuses.queue[1], 'Status is improper');
    });

    /**
     * Check if status has changed (using named function)
     */
    it(`Asserting ${testing.statuses.queue[1]}() returning true`, function() {
      assert.strictEqual(
        status[testing.statuses.queue[1]](), true, 'Returns improper value');
    });

    /**
     * Check if status has changed (using named function)
     */
    it(`Asserting ${testing.statuses.queue[0]}() returning false`, function() {
      assert.strictEqual(
        status[testing.statuses.queue[0]](),
        false, 'Returns improper value');
    });

    /**
     * Set to initial
     */
    it(`Asserting toInitial() changing status to "${testing.statuses.queue[0]}" and returning undefined`, function() {
      assert.strictEqual(status.toInitial(), undefined, 'Returns improper value');
      assert.strictEqual(status.getCurrent(), testing.statuses.queue[0], 'Status is improper');
    });

    /**
     * 1->3 by force
     */
    it(`Asserting ${testing.statuses.queue[2]}(true, true) moving directly to the "${testing.statuses.queue[2]}" and returning true`, function() {
      assert.strictEqual(
        status[testing.statuses.queue[2]](true, true),
        true, 'Return value is improper')
      assert.strictEqual(status.getCurrent(), testing.statuses.queue[2], 'Status is improper');
    });

    /**
     * Check if 2<3, 3==3, and 3<4 (Really. It's that simple)
     */
    it(`Asserting before(x) returning boolean that points if the current status if before the given state x`, function() {
      assert.strictEqual(status.before(testing.statuses.queue[1]), false, 'Returns improper value, when after');
      assert.strictEqual(status.before(testing.statuses.queue[2]), false, 'Returns improper value, when equals');
      assert.strictEqual(status.before(testing.statuses.queue[3]), true, 'Returns improper value, when before');
    });

    /**
     * Check if 2<3, 3==3, and 3<4 (Really. It's that simple)
     */
    it(`Asserting after(x) returning boolean that points if the current status if after the given state x`, function() {
      assert.strictEqual(status.before(testing.statuses.queue[1]), false, 'Returns improper value, when after');
      assert.strictEqual(status.before(testing.statuses.queue[2]), false, 'Returns improper value, when equals');
      assert.strictEqual(status.before(testing.statuses.queue[3]), true, 'Returns improper value, when before');
    });

    /**
     * @TODO move this test to the separate section
     */
    it(`Asserting before(x) and after(x) throwing FloorenceStateError after improper value of x`, function() {
      assert.throws(status.before.bind(this, 'abracadabra'), FloorenceStateError, 'There is no such a status like abracadabra');
      assert.throws(status.after.bind(this, 234), FloorenceStateError, 'There is no such a status like 234');
    });
  });
});



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
