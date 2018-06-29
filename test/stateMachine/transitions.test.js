import stateMachine from '../../assets/Script/AI design/SM&BT/stateMachine/stateMachine';

const assert = require('assert');

describe('stateMachine_transitions', () => {
  it('basic transition from state to state', () => {
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

  it('wildcard :from allows transition from any state', () => {
    const fsm = stateMachine({
      init: 'stopped',
      transitions: [
        { name: 'prepare', from: 'stopped', to: 'ready' },
        { name: 'start', from: 'ready', to: 'running' },
        { name: 'resume', from: 'paused', to: 'running' },
        { name: 'pause', from: 'running', to: 'paused' },
        { name: 'stop', from: '*', to: 'stopped' },
      ],
    });

    assert.equal(fsm.state, 'stopped');

    fsm.prepare(); assert.equal(fsm.state, 'ready');
    fsm.stop(); assert.equal(fsm.state, 'stopped');

    fsm.prepare(); assert.equal(fsm.state, 'ready');
    fsm.start(); assert.equal(fsm.state, 'running');
    fsm.stop(); assert.equal(fsm.state, 'stopped');

    fsm.prepare(); assert.equal(fsm.state, 'ready');
    fsm.start(); assert.equal(fsm.state, 'running');
    fsm.pause(); assert.equal(fsm.state, 'paused');
    fsm.stop(); assert.equal(fsm.state, 'stopped');
    fsm.stop(); assert.equal(fsm.state, 'stopped');


    assert.deepEqual(fsm.transitions(), ['prepare', 'stop']);
    fsm.prepare(); assert.deepEqual(fsm.transitions(), ['start', 'stop']);
    fsm.start(); assert.deepEqual(fsm.transitions(), ['pause', 'stop']);
    fsm.stop(); assert.deepEqual(fsm.transitions(), ['prepare', 'stop']);
  });

  it('transitions with multiple from states', () => {
    const fsm = stateMachine({
      transitions: [
        { name: 'start', from: 'none', to: 'green' },
        { name: 'warn', from: ['green', 'red'], to: 'yellow' },
        { name: 'panic', from: ['green', 'yellow'], to: 'red' },
        { name: 'clear', from: ['red', 'yellow'], to: 'green' },
      ],
    });

    assert.deepEqual(fsm.allStates(), ['none', 'green', 'red', 'yellow']);
    assert.deepEqual(fsm.allTransitions(), ['start', 'warn', 'panic', 'clear']);

    assert.equal(fsm.state, 'none');
    assert.equal(fsm.canTransition('start'), true);
    assert.equal(fsm.canTransition('warn'), false);
    assert.equal(fsm.canTransition('panic'), false);
    assert.equal(fsm.canTransition('clear'), false);
    assert.deepEqual(fsm.transitions(), ['start']);

    fsm.start();
    assert.equal(fsm.canTransition('start'), false);
    assert.equal(fsm.canTransition('warn'), true);
    assert.equal(fsm.canTransition('panic'), true);
    assert.equal(fsm.canTransition('clear'), false);
    assert.deepEqual(fsm.transitions(), ['warn', 'panic']);

    fsm.warn();
    assert.equal(fsm.canTransition('start'), false);
    assert.equal(fsm.canTransition('warn'), false);
    assert.equal(fsm.canTransition('panic'), true);
    assert.equal(fsm.canTransition('clear'), true);
    assert.deepEqual(fsm.transitions(), ['panic', 'clear']);

    fsm.panic();
    assert.equal(fsm.canTransition('start'), false);
    assert.equal(fsm.canTransition('warn'), true);
    assert.equal(fsm.canTransition('panic'), false);
    assert.equal(fsm.canTransition('clear'), true);
    assert.deepEqual(fsm.transitions(), ['warn', 'clear']);

    fsm.clear();
    assert.equal(fsm.canTransition('start'), false);
    assert.equal(fsm.canTransition('warn'), true);
    assert.equal(fsm.canTransition('panic'), true);
    assert.equal(fsm.canTransition('clear'), false);
    assert.deepEqual(fsm.transitions(), ['warn', 'panic']);
  });
});
