import stateMachine from '../../assets/Script/AI design/SM&BT/stateMachine/stateMachine';

const assert = require('assert');

describe('lifeCycle', () => {
  it('lifecycle events occur in correct order', () => {
    const fsm = stateMachine({
      init: 'solid',
      transitions: [
        { name: 'melt', from: 'solid', to: 'liquid' },
        { name: 'freeze', from: 'liquid', to: 'solid' },
        { name: 'vaporize', from: 'liquid', to: 'gas' },
        { name: 'condense', from: 'gas', to: 'liquid' },
      ],
      methods: {
        onBeforeMelt() { return 'onBeforeMelt'; },
        onLeaveSolid() { return 'onLeaveSolid'; },
        onMelt() { return 'onMelt'; },
        onEnterLiquid() { return 'onEnterLiquid'; },
        onAfterMelt() { return 'onAfterMelt'; },
        onFreeze() { return 'onFroze'; },
        onVaporize() { return 'onVaporized'; },
        onCondense() { return 'onCondensed'; },
      },
    });

    assert.equal(fsm.state, 'solid');

    const result = fsm.melt();

    assert.equal(result.onBefore, 'onBeforeMelt');
    assert.equal(result.onLeave, 'onLeaveSolid');
    assert.equal(result.on, 'onMelt');
    assert.equal(result.onEnter, 'onEnterLiquid');
    assert.equal(result.onAfter, 'onAfterMelt');
    assert.equal(fsm.state, 'liquid');
  });

  // lack promise, name change and so on
});
