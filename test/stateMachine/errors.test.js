import stateMachine from '../../assets/Script/AI design/SM&BT/stateMachine/stateMachine';

const assert = require('assert');

describe('stateMachine_errors', () => {
  it('invalid transition defination', () => {
    assert.throws(() => {
      stateMachine({
        transitions: {
          first: { name: 'step', from: 'none', to: 'complete' },
        },
      });
    }, /Please define an Array shaped "transitions"$/);
  });

  it('state cannot be modified directly', () => {
    const fsm = stateMachine({
      transitions: [
        { name: 'step', from: 'none', to: 'complete' },
      ],
    });

    assert.equal(fsm.state, 'none');
    assert.throws(() => {
      fsm.state = 'other';
    }, /Cannot set custom properties on stateMachine directly$/);
    assert.equal(fsm.state, 'none');
  });

  it('invalid transition raises an exception', () => {
    const fsm = stateMachine({
      transitions: [
        { name: 'step1', from: 'none', to: 'A' },
        { name: 'step2', from: 'A', to: 'B' },
      ],
    });

    assert.equal(fsm.state, 'none');
    assert.equal(fsm.canTransition('step1'), true);
    assert.equal(fsm.canTransition('step2'), false);

    assert.throws(() => {
      fsm.step2();
    }, /Transition "step2" is invalid in current state$/);
  });

  it('fire transition while existing transition is still in process raises an exception', () => {
    const fsm = stateMachine({
      transitions: [
        { name: 'step', from: 'none', to: 'A' },
        { name: 'other', from: 'none', to: 'X' },
      ],
      methods: {
        onBeforeStep() { fsm.other(); },
        onBeforeOther() { assert.fail('should never happen'); },
        onEnterX() { assert.fail('should never happen'); },
      },
    });

    assert.equal(fsm.state, 'none');
    assert.equal(fsm.canTransition('step'), true);
    assert.equal(fsm.canTransition('other'), true);

    assert.throws(() => {
      fsm.step();
    }, /Transition is invalid while previous transition is still in progress$/);
  });
});
