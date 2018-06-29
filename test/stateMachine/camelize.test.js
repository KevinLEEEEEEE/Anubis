import camelize from '../../assets/Script/AI design/SM&BT/stateMachine/util/camelize';

const assert = require('assert');

describe('camelize', () => {
  it('singleLowerCase', () => {
    assert.equal(camelize('t'), 'T');
  });
  it('singleUpperCase', () => {
    assert.equal(camelize('T'), 'T');
  });
  it('multipleLowerCase', () => {
    assert.equal(camelize('test'), 'Test');
  });
  it('multipleUpperCase', () => {
    assert.equal(camelize('Test'), 'Test');
  });
});

describe('prepend', () => {
  it('singleLowerCasePrepend', () => {
    assert.equal(camelize.prepend('t', 'on'), 'onT');
  });
  it('singleUpperCasePrepend', () => {
    assert.equal(camelize.prepend('T', 'on'), 'onT');
  });
  it('multipleLowerCasePrepend', () => {
    assert.equal(camelize.prepend('test', 'on'), 'onTest');
  });
  it('multipleUpperCasePrepend', () => {
    assert.equal(camelize.prepend('Test', 'on'), 'onTest');
  });
});
