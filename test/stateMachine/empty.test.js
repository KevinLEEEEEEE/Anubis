import stateMachine from '../../assets/Script/AI design/SM&BT/stateMachine/stateMachine';

const assert = require('assert');

describe('stateMachine_errors', () => {
  it('empty state machine', () => {
    assert.throws(() => {
      stateMachine();
    }, /Missing state machine main structure$/);
  });

  it('empty object state machine', () => {
    assert.throws(() => {
      stateMachine({});
    }, /Please define an Array shaped "transitions"$/);
  });
});
