import isEqual from '../../assets/Script/utils/isEqual';

const assert = require('assert');

describe('isEqual', () => {
  it('basic equal object', () => {
    const obj1 = {
      level: 1,
      match: 1,
    };
    const obj2 = {
      level: 1,
      match: 1,
    };

    assert.equal(isEqual(obj1, obj2), true);
  });

  it('basic unEqual object', () => {
    const obj1 = {
      level: 1,
      match: 2,
    };
    const obj2 = {
      level1: 1,
      match: 1,
    };

    assert.equal(isEqual(obj1, obj2), false);
  });
});
