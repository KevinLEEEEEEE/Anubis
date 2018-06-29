import stateMachine from '../../assets/Script/AI design/SM&BT/stateMachine/stateMachine';

const assert = require('assert');

describe('stateMachine_construction', () => {
  it('singleton construction', () => {
    const fsm = stateMachine({
      transitions: [
        { name: 'init', from: 'none', to: 'A' },
        { name: 'step1', from: 'A', to: 'B' },
        { name: 'step2', from: 'B', to: 'C' },
      ],
    });

    assert.equal(fsm.state, 'none');

    assert.deepEqual(fsm.states(), ['A']);
    assert.deepEqual(fsm.allStates(), ['none', 'A', 'B', 'C']);
    assert.deepEqual(fsm.transitions(), ['init']);
    assert.deepEqual(fsm.allTransitions(), ['init', 'step1', 'step2']);
  });

  it('singleton construction - with init state', () => {
    const fsm = stateMachine({
      init: 'A',
      transitions: [
        { name: 'init', from: 'none', to: 'A' },
        { name: 'step1', from: 'A', to: 'B' },
        { name: 'step2', from: 'B', to: 'C' },
      ],
    });

    assert.equal(fsm.state, 'A');

    assert.deepEqual(fsm.states(), ['B']);
    assert.deepEqual(fsm.allStates(), ['none', 'A', 'B', 'C']);
    assert.deepEqual(fsm.transitions(), ['step1']);
    assert.deepEqual(fsm.allTransitions(), ['init', 'step1', 'step2']);
  });

  it('singleton construction - with init state and transition', () => {
    const fsm = stateMachine({
      init: { name: 'boot', to: 'A' },
      transitions: [
        { name: 'step1', from: 'A', to: 'B' },
        { name: 'step2', from: 'B', to: 'C' },
      ],
    });

    assert.equal(fsm.state, 'A');

    assert.deepEqual(fsm.states(), ['B']);
    assert.deepEqual(fsm.allStates(), ['none', 'A', 'B', 'C']);
    assert.deepEqual(fsm.transitions(), ['step1']);
    assert.deepEqual(fsm.allTransitions(), ['boot', 'step1', 'step2']);
  });

  it('singleton construction - with init state, transition, AND from state', () => {
    const fsm = stateMachine({
      init: { name: 'boot', from: 'booting', to: 'A' },
      transitions: [
        { name: 'step1', from: 'A', to: 'B' },
        { name: 'step2', from: 'B', to: 'C' },
      ],
    });

    assert.equal(fsm.state, 'A');

    assert.deepEqual(fsm.states(), ['B']);
    assert.deepEqual(fsm.allStates(), ['booting', 'A', 'B', 'C']);
    assert.deepEqual(fsm.transitions(), ['step1']);
    assert.deepEqual(fsm.allTransitions(), ['boot', 'step1', 'step2']);
  });

  it('singleton construction - with custom data as value', () => {
    const fsm = stateMachine({
      init: 'A',
      transitions: [
        { name: 'step1', from: 'A', to: 'B' },
        { name: 'step2', from: 'B', to: 'C' },
      ],
      data: {
        value: 42,
      },
      methods: {
        onStep1() {
          return this.data.value;
        },
      },
    });

    assert.equal(fsm.state, 'A');
    assert.equal(fsm.step1().on, '42');
  });

  it('singleton construction - with custom data as function', () => {
    const fsm = stateMachine({
      init: 'A',
      transitions: [
        { name: 'step1', from: 'A', to: 'B' },
        { name: 'step2', from: 'B', to: 'C' },
      ],
      data: {
        local: 42,
        value() {
          return this.local;
        },
      },
      methods: {
        onStep1() {
          return this.data.value;
        },
      },
    });

    assert.equal(fsm.state, 'A');
    assert.equal(fsm.step1().on, '42');
  });
});
