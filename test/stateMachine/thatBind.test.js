import stateMachine from '../../assets/Script/AI design/SM&BT/stateMachine/stateMachine';

const assert = require('assert');

describe('stateMachine_thatBind', () => {
  it('binding that without data', () => {
    const that = {
      test(state) {
        return `works on ${state}`;
      },
    };
    const fsm = stateMachine({
      init: 'green',
      transitions: [
        { name: 'warn', from: 'green', to: 'yellow' },
        { name: 'heal', from: 'yellow', to: 'green' },
      ],
      methods: {
        onWarn() {
          return this.test('warn');
        },
        onHeal() {
          return this.test('heal');
        },
      },
    }, that);

    assert.equal(fsm.state, 'green');

    assert.equal(fsm.warn().on, 'works on warn');
    assert.equal(fsm.state, 'yellow');

    assert.equal(fsm.heal().on, 'works on heal');
    assert.equal(fsm.state, 'green');
  });

  it('binding that with data', () => {
    const that = {
      data: {
        localData: 'local',
      },
      test(state) {
        return `works on ${state} ${this.data.localData}`;
      },
    };
    const fsm = stateMachine({
      init: 'green',
      transitions: [
        { name: 'warn', from: 'green', to: 'yellow' },
        { name: 'heal', from: 'yellow', to: 'green' },
      ],
      methods: {
        onWarn() {
          return this.test('warn');
        },
        onHeal() {
          return this.test('heal');
        },
      },
    }, that);

    assert.equal(fsm.state, 'green');

    assert.equal(fsm.warn().on, 'works on warn local');
    assert.equal(fsm.state, 'yellow');

    assert.equal(fsm.heal().on, 'works on heal local');
    assert.equal(fsm.state, 'green');
  });
});
