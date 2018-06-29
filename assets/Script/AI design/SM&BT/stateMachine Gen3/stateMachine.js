import config from './config';

const btPrototypies = {
  is(state) { return this._fsm.is(state); },
  can(transition) { return this._fsm.can(transition); },
  cannot(transition) { return this._fsm.cannot(transition); },
  observe(...args) { return this._fsm.observe(args); },
  transitions() { return this._fsm.transitions(); },
  allTransitions() { return this._fsm.allTransitions(); },
  allStates() { return this._fsm.allStates(); },
};

const build = (instance, config) => {
  Reflect.setPrototypeOf(instance, btPrototypies);

  Reflect.defineProperty(instance, 'state', {
    configurable: false,
    enumerable: true,
    get() {
      return this._fsm.state;
    },
    set() {
      throw Error('use transitions to change state');
    },
  });
};

const apply = (instance, options) => {
  const newConfig = config(options);

  build(instance, newConfig);
  instance._fsm();

  return instance;
};

export default function behaviorTree(options) {
  return apply(this || {}, options);
}
