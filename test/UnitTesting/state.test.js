
import { assert } from 'chai'
class Status {}

let status;


let testing = {
  statuses: {
    queue: ['idle', 'showing', 'shown', 'processing', 'processed', 'hiding', 'hidden'],
    negativeQueues: [
      ['idle', 'shown'],
      ['idle', 'showing', 'shown', 'processed'],
      ['idle', 'idle'],
      ['showing', 'idle']
    ]
  }
}

describe('StateManager - units', function() {
  describe('#Statuses - ordered tests', function() {

    before(function() {
      status = new Status();
      console.log(`\tThe following tests are the ordered sequence of actions`);
      console.log(`\tCurrent status: ${testing.statuses.queue[0]}`);
      console.log(`\tNext status: ${testing.statuses.queue[1]}`);
      console.log(`\tThe third one: ${testing.statuses.queue[2]}`);
    })

    it(`Asserting that both current and getCurrent() return "${testing.statuses.queue[0]}"`, function() {
      assert.strictEqual(status.current, testing.statuses.queue[0]);
      assert.strictEqual(status.getCurrent, testing.statuses.queue[0]);
    });

    it(`Asserting that both next and getNext() return "${testing.statuses.queue[1]}"`, function() {
      assert.strictEqual(status.current, testing.statuses.queue[1]);
      assert.strictEqual(status.getCurrent, testing.statuses.queue[1]);
    });

    it(`Asserting ${testing.statuses.queue[2]}(true) NOT changing status to "${testing.statuses.queue[2]}" and returning false`, function() {
      assert.strictEqual(status.current, testing.statuses.queue[1]);
      assert.strictEqual(status.getCurrent, testing.statuses.queue[1]);
    });

    it(`Asserting ${testing.statuses.queue[1]}(true) changing status to "${testing.statuses.queue[1]}" and returning true`, function() {
      assert.strictEqual(status.current, testing.statuses.queue[1]);
      assert.strictEqual(status.getCurrent, testing.statuses.queue[1]);
    });

    it(`Asserting ${testing.statuses.queue[1]}() returning true`, function() {
      assert.strictEqual(status.current, testing.statuses.queue[1]);
      assert.strictEqual(status.getCurrent, testing.statuses.queue[1]);
    });

    it(`Asserting ${testing.statuses.queue[0]}() returning false`, function() {
      assert.strictEqual(status.current, testing.statuses.queue[1]);
      assert.strictEqual(status.getCurrent, testing.statuses.queue[1]);
    });

    it(`Asserting toInitial() changing status to "${testing.statuses.queue[0]}" and returning undefined`, function() {
      assert.strictEqual(status.current, testing.statuses.queue[0]);
      assert.strictEqual(status.getCurrent, testing.statuses.queue[0]);
    });

    it(`Asserting ${testing.statuses.queue[2]}(true, true) moving directly to the "${testing.statuses.queue[2]}" and returning true`, function() {
      status[testing.statuses.queue[2]](true, true);
      assert.strictEqual(status.current, testing.statuses.queue[2]);
    });
  });
});
