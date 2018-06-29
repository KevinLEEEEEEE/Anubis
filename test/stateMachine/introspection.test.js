import stateMachine from '../../assets/Script/AI design/SM&BT/stateMachine/stateMachine';

const assert = require('assert');

describe('stateMachine_introspection', () => {
  it('is', () => {
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

    assert.equal(fsm.is('green'), true);
    assert.equal(fsm.is('yellow'), false);
    assert.equal(fsm.is(['yellow', 'green']), 1);
    assert.equal(fsm.is(['yellow', 'red']), -1);

    fsm.warn();

    assert.equal(fsm.is('yellow'), true);
    assert.equal(fsm.is('red'), false);
    assert.equal(fsm.is(['yellow', 'green']), 0);
    assert.equal(fsm.is(['red', 'green']), -1);
  });

  it('can && cannot', () => {
    const fsm = stateMachine({
      init: 'green',
      transitions: [
        { name: 'warn', from: 'green', to: 'yellow' },
        { name: 'panic', from: 'yellow', to: 'red' },
        { name: 'calm', from: 'red', to: 'yellow' },
      ],
    });

    assert.equal(fsm.state, 'green');

    assert.equal(fsm.canState('yellow'), true);
    assert.equal(fsm.canState('red'), false);
    assert.equal(fsm.canTransition('warn'), true);
    assert.equal(fsm.canTransition('panic'), false);

    fsm.warn();

    assert.equal(fsm.canState('red'), true);
    assert.equal(fsm.canState('green'), false);
    assert.equal(fsm.canTransition('panic'), true);
    assert.equal(fsm.canTransition('calm'), false);
  });

  it('can is always false during lifecycle events', () => {
    let fsm = null;
    const assertTransitionsNotAllowed = () => {
      const tmp = () => {
        assert.equal(this.canState('green'), false);
        assert.equal(this.canState('yellow'), false);
        assert.equal(this.canState('red'), false);
        assert.equal(this.canTransition('warn'), false);
        assert.equal(this.canTransition('panic'), false);
        assert.equal(this.canTransition('calm'), false);
      };
      return tmp.bind(fsm);
    };
    fsm = stateMachine({
      init: 'green',
      transitions: [
        { name: 'warn', from: 'green', to: 'yellow' },
        { name: 'panic', from: 'yellow', to: 'red' },
        { name: 'calm', from: 'red', to: 'yellow' },
      ],
      methods: {
        onBeforeWarn() { assertTransitionsNotAllowed(); },
        onBeforePanic() { assertTransitionsNotAllowed(); },
        onBeforeCalm() { assertTransitionsNotAllowed(); },
        onLeaveGreen() { assertTransitionsNotAllowed(); },
        onLeaveYellow() { assertTransitionsNotAllowed(); },
        onLeaveRed() { assertTransitionsNotAllowed(); },
        onEnterGreen() { assertTransitionsNotAllowed(); },
        onEnterYellow() { assertTransitionsNotAllowed(); },
        onEnterRed() { assertTransitionsNotAllowed(); },
        onAfterInit() { assertTransitionsNotAllowed(); },
        onAfterWarn() { assertTransitionsNotAllowed(); },
        onAfterPanic() { assertTransitionsNotAllowed(); },
        onAfterCalm() { assertTransitionsNotAllowed(); },
      },
    });

    assert.equal(fsm.state, 'green');
    fsm.warn();
    assert.equal(fsm.state, 'yellow');
    fsm.panic();
    assert.equal(fsm.state, 'red');
  });

  it('all states', () => {
    const fsm = stateMachine({
      init: 'green',
      transitions: [
        { name: 'warn', from: 'green', to: 'yellow' },
        { name: 'panic', from: 'yellow', to: 'red' },
        { name: 'calm', from: 'red', to: 'yellow' },
        { name: 'clear', from: 'yellow', to: 'green' },
        { name: 'finish', from: 'green', to: 'done' },
      ],
    });

    assert.deepEqual(fsm.allStates(), ['green', 'yellow', 'red', 'done']);
  });

  it('valid states', () => {
    const fsm = stateMachine({
      init: 'green',
      transitions: [
        { name: 'warn', from: 'green', to: 'yellow' },
        { name: 'panic', from: 'yellow', to: 'red' },
        { name: 'calm', from: 'red', to: 'yellow' },
        { name: 'clear', from: 'yellow', to: 'green' },
        { name: 'finish', from: 'green', to: 'done' },
      ],
    });

    assert.deepEqual(fsm.states(), ['yellow', 'done']);
  });

  it('all transitions', () => {
    const fsm = stateMachine({
      init: 'green',
      transitions: [
        { name: 'warn', from: 'green', to: 'yellow' },
        { name: 'panic', from: 'yellow', to: 'red' },
        { name: 'calm', from: 'red', to: 'yellow' },
        { name: 'clear', from: 'yellow', to: 'green' },
        { name: 'finish', from: 'green', to: 'done' },
      ],
    });

    assert.deepEqual(fsm.allTransitions(), ['warn', 'panic', 'calm', 'clear', 'finish']);
  });

  it('valid transitions', () => {
    const fsm = stateMachine({
      init: 'green',
      transitions: [
        { name: 'warn', from: 'green', to: 'yellow' },
        { name: 'panic', from: 'yellow', to: 'red' },
        { name: 'calm', from: 'red', to: 'yellow' },
        { name: 'clear', from: 'yellow', to: 'green' },
        { name: 'finish', from: 'green', to: 'done' },
      ],
    });

    assert.deepEqual(fsm.transitions(), ['warn', 'finish']);
  });
});
