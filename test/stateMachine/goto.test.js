import stateMachine from '../../assets/Script/AI design/SM&BT/stateMachine/stateMachine';

const assert = require('assert');

describe('stateMachine_goto', () => {
  it('goto to a known state', () => {
    const fsm = stateMachine({
      transitions: [
        { name: 'step1', from: 'none', to: 'A' },
        { name: 'step2', from: 'A', to: 'B' },
      ],
    });

    assert.equal(fsm.state, 'none');

    fsm.goto('A'); assert.equal(fsm.state, 'A');
    fsm.goto('B'); assert.equal(fsm.state, 'B');
  });

  it('goto to an unknown state', () => {
    const fsm = stateMachine({
      transitions: [
        { name: 'step1', from: 'none', to: 'A' },
      ],
    });

    assert.equal(fsm.state, 'none');
    assert.throws(() => {
      fsm.goto('C');
    });
    assert.equal(fsm.state, 'none');
  }, /State "C" is invalid in current state$/);

  it('goto can have additional arguments', () => {
    const fsm = stateMachine({
      transitions: [
        { name: 'step1', from: 'none', to: 'A' },
        { name: 'step2', from: 'A', to: 'B' },
      ],
      methods: {
        onStep1: args => args,
        onStep2: args => args,
      },
    });

    assert.equal(fsm.state, 'none');
    assert.deepEqual(fsm.goto('A', 'arg1', 'arg2').on, ['arg1', 'arg2']);
    assert.equal(fsm.state, 'A');
    assert.deepEqual(fsm.goto('B', 'arg3', 'arg4').on, ['arg3', 'arg4']);
    assert.equal(fsm.state, 'B');
  });
});
