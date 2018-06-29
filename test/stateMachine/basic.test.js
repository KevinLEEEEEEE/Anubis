import stateMachine from '../../assets/Script/AI design/SM&BT/stateMachine/stateMachine';

const assert = require('assert');

describe('stateMachine_basic', () => {
  it('state machine self target', () => {
    const fsm = stateMachine({
      init: 'green',
      transitions: [
        { name: 'warn', from: 'green', to: 'yellow' },
        { name: 'panic', from: 'yellow', to: 'red' },
        { name: 'calm', from: 'red', to: 'yellow' },
        { name: 'clear', from: 'yellow', to: 'green' },
      ],
    });

    assert.equal(fsm.state, 'green');

    fsm.warn(); assert.equal(fsm.state, 'yellow');
    fsm.panic(); assert.equal(fsm.state, 'red');
    fsm.calm(); assert.equal(fsm.state, 'yellow');
    fsm.clear(); assert.equal(fsm.state, 'green');
  });

  it('state machine other target', () => {
    const other = {};
    const fsm = stateMachine({
      init: 'green',
      transitions: [
        { name: 'warn', from: 'green', to: 'yellow' },
        { name: 'panic', from: 'yellow', to: 'red' },
        { name: 'calm', from: 'red', to: 'yellow' },
        { name: 'clear', from: 'yellow', to: 'green' },
      ],
    }, other);

    assert.equal(fsm.state, 'green');

    fsm.warn(); assert.equal(fsm.state, 'yellow');
    fsm.panic(); assert.equal(fsm.state, 'red');
    fsm.calm(); assert.equal(fsm.state, 'yellow');
    fsm.clear(); assert.equal(fsm.state, 'green');
  });
});
