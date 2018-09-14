
import { assert } from 'chai'
import Status from './../../src/StateManager/Status.js';
import FloorenceStateError from './../../src/Errors/FloorenceStateError.js';

let status;


let testing = {
  statuses: {

    improperNames: {
      namingConvention: ['idle-state', 'green!', '34yellow', 'sth@poll', '!green'],
      reservedKeywords: ['getNext', 'getCurrent', 'current', 'next', 'toInitial', 'before', 'after']
    },
    properNames: ['yellow34'],
    queue: ['idle', 'showing', 'shown', 'processing', 'processed', 'hiding', 'hidden'],
    improperQueues: [
      ['idle', 'shown'],
      ['idle', 'showing', 'shown', 'processed'],
      ['idle', 'idle'],
      ['showing', 'idle']
    ]
  }
}

describe('StateManager - units', function() {

  describe('#Statuses - naming', function() {

    testing.statuses.improperNames.namingConvention.forEach((name, index) => {
      it(`Asserting wrong name of the queue element (naming convention) #${index}`, function(){
        assert.throws(() => {
          status = new Status([name]);
        }, FloorenceStateError, `Invalid name: ${name}. The name of the status must start from the letter or the underscore and has to be alphanumeric (latin alphabet, underscores are also permitted)`
      )});
    });

    testing.statuses.improperNames.reservedKeywords.forEach((name, index) => {
      it(`Asserting wrong name of the queue element (reserved keywords) #${index}`, function(){
        assert.throws(() => {
          status = new Status([name]);
        }, FloorenceStateError, `Invalid name: ${name}. This is our reserved keyword`
      )});
    });



  });


  describe('#Statuses - ordered tests', function() {
    before(function() {
      status = new Status(testing.statuses.queue);
    })

    it(`Asserting that both current and getCurrent() return "${testing.statuses.queue[0]}"`, function() {
      assert.strictEqual(status.current, testing.statuses.queue[0], 'current has got improper value');
      assert.strictEqual(status.getCurrent(), testing.statuses.queue[0], 'getCurrent() has got improper value');
    });

    it(`Asserting that both next and getNext() return "${testing.statuses.queue[1]}"`, function() {
      assert.strictEqual(status.next, testing.statuses.queue[1], 'next has got improper value');
      assert.strictEqual(status.getNext(), testing.statuses.queue[1], 'getNext() has got improper value');
    });

    it(`Asserting ${testing.statuses.queue[2]}(true) NOT changing status to "${testing.statuses.queue[2]}" and returning false`, function() {
      assert.strictEqual(
        status[testing.statuses.queue[2]](true),
        false, 'Returns improper value');
      assert.strictEqual(status.getCurrent(), testing.statuses.queue[0], 'Status is improper');
    });

    it(`Asserting ${testing.statuses.queue[1]}(true) changing status to "${testing.statuses.queue[1]}" and returning true`, function() {
      assert.strictEqual(status[testing.statuses.queue[1]](true),
      true, 'Returns improper value');
      assert.strictEqual(status.getCurrent(), testing.statuses.queue[1], 'Status is improper');
    });

    it(`Asserting ${testing.statuses.queue[1]}() returning true`, function() {
      assert.strictEqual(
        status[testing.statuses.queue[1]](), true, 'Returns improper value');
    });

    it(`Asserting ${testing.statuses.queue[0]}() returning false`, function() {
      assert.strictEqual(
        status[testing.statuses.queue[0]](),
        false, 'Returns improper value');
    });

    it(`Asserting toInitial() changing status to "${testing.statuses.queue[0]}" and returning undefined`, function() {
      assert.strictEqual(status.toInitial(), undefined, 'Returns improper value');
      assert.strictEqual(status.getCurrent(), testing.statuses.queue[0], 'Status is improper');
    });

    it(`Asserting ${testing.statuses.queue[2]}(true, true) moving directly to the "${testing.statuses.queue[2]}" and returning true`, function() {
      assert.strictEqual(
        status[testing.statuses.queue[2]](true, true),
        true, 'Return value is improper')
      assert.strictEqual(status.getCurrent(), testing.statuses.queue[2], 'Status is improper');
    });

    it(`Asserting before(x) returning boolean that points if the current status if before the given state x`, function() {
      assert.strictEqual(status.before(testing.statuses.queue[1]), false, 'Returns improper value, when after');
      assert.strictEqual(status.before(testing.statuses.queue[2]), false, 'Returns improper value, when equals');
      assert.strictEqual(status.before(testing.statuses.queue[3]), true, 'Returns improper value, when before');
    });

    it(`Asserting after(x) returning boolean that points if the current status if after the given state x`, function() {
      assert.strictEqual(status.before(testing.statuses.queue[1]), false, 'Returns improper value, when after');
      assert.strictEqual(status.before(testing.statuses.queue[2]), false, 'Returns improper value, when equals');
      assert.strictEqual(status.before(testing.statuses.queue[3]), true, 'Returns improper value, when before');
    });

    it(`Asserting before(x) and after(x) throwing FloorenceStateError after improper value of x`, function() {
      assert.throws(status.before.bind(this, 'abracadabra'), FloorenceStateError, 'There is no such a status like abracadabra');
      assert.throws(status.after.bind(this, 234), FloorenceStateError, 'There is no such a status like 234');
    });
  });
});
