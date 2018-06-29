import camelize from './util/camelize';
import { smState as $ } from './config';

//--------------------------------------------------------------------------

const statesProp = {
  canState(state) {
    return Reflect.has(this.states, state);
  },
  canTransition(transition) {
    return Reflect.has(this.transitions, transition);
  },
  getStates() {
    return Object.keys(this.states);
  },
  getTransitions() {
    return Object.keys(this.transitions); // return the object key list
  },
};

//--------------------------------------------------------------------------

const _stateMachine = {
  getInit(sm) {
    if (Reflect.has(sm, 'init')) { // has 'init' then return name
      switch (typeof sm.init) {
        case 'string':
          return sm.init;
        case 'object': {
          const tmp = sm.init;
          if (Reflect.has(tmp, 'to') && Reflect.has(tmp, 'name')) {
            const { name, from = 'none', to } = tmp;
            sm.transitions.unshift({ name, from, to }); // add to transitions list
            return sm.init.to;
          }
          throw new Error('Missing "name" or "to" in the init object');
        }
        default:
          throw new Error('The "init" must a string or an object');
      }
    }
    return 'none'; // else use 'none' as default state
  },

  getMethods(sm, that) {
    if (!Reflect.has(sm, 'methods')) {
      return {};
    }

    const { methods, data } = sm;
    let target = that;

    if (data !== undefined && typeof data === 'object') {
      const dataProxy = new Proxy(data, {
        get(targets, property) {
          if (Reflect.has(targets, property)) {
            const tmpData = targets[property];
            if (tmpData instanceof Function) {
              return tmpData.bind(data)(); // if data is a function, return the result
            }
            return tmpData; // if data is not a function, return directly
          }
          throw new Error(`Cannot reach property: ${property}`);
        },
      });

      if (sm !== that) { // has sth to bind
        const symbolData = Symbol('data');
        const mix = Object.assign(that, { [symbolData]: dataProxy });

        target = new Proxy(mix, {
          get(targets, property) {
            if (property === 'data') {
              return targets[symbolData];
            } else if (Reflect.has(targets, property)) {
              return targets[property].bind(that); // properties from 'that'
            }
            throw new Error(`Cannot reach property: ${property}`);
          },
        });
      } else {
        target = { data: dataProxy };
      }
    }

    const tmp = {};

    Object.keys(methods).forEach((key) => {
      tmp[key] = methods[key].bind(target);
    });

    return tmp;
  },

  getStates(sm, methods) {
    if (!(Reflect.has(sm, 'transitions') && sm.transitions instanceof Array)) {
      throw new Error('Please define an Array shaped "transitions"');
    }
    const states = sm.transitions;
    const tmp = {};
    const define = (target, prop, key, value) => {
      if (!Reflect.has(target, prop)) {
        target[prop] = {};
      }
      if (key !== undefined && value !== undefined) {
        target[prop][key] = value;
      }
    };
    const statesLifeCycle = (target, context) => {
      this.getLifeCycle(['onEnter', 'onLeave'], target, context, methods);
      // states have 'onEnter' and 'onLeave' lifeCycle methods
    };

    states.forEach((state) => {
      const { name, from: rawFrom, to } = state;
      const froms = rawFrom instanceof Array ? rawFrom : [rawFrom];

      froms.forEach((from) => {
        if (Reflect.has(tmp, from)) {
          const target = tmp[from];
          define(target, 'transitions', name, to);
          define(target, 'states', to, name);
        } else {
          tmp[from] = Object.create(statesProp);
          const target = tmp[from];

          /**
           * brief description
           *
           * @param name the name of transitions
           * @param from the state before transition
           * @param to the state after transition
           *
           * init transition and state here,
           * property can be defined on 'from' part
           */

          define(target, 'transitions', name, to);
          define(target, 'states', to, name);

          statesLifeCycle(target, from);
        }
      });
      if (!Reflect.has(tmp, to)) {
        tmp[to] = Object.create(statesProp);
        const target = tmp[to];

        define(target, 'transitions');
        define(target, 'states');

        statesLifeCycle(target, to);
      }
    });

    return tmp;
  },
  getTransitions(sm, methods) {
    const { transitions } = sm;
    const tmp = {};
    const transitionsLifeCycle = (target, context) => {
      this.getLifeCycle(['on', 'onBefore', 'onAfter'], target, context, methods);
      // states have 'on' and 'onBefore' and 'onAfter' lifeCycle methods
    };

    transitions.forEach((transition) => {
      const { name } = transition;
      if (!Reflect.has(tmp, name)) {
        tmp[name] = {};
        transitionsLifeCycle(tmp[name], name);
      }
    });

    return tmp;
  },

  getLifeCycle(array, target, context, methods) {
    Reflect.defineProperty(target, 'lifeCycle', {
      value: {},
    }); // define lifeCycle property in target

    array.forEach((method) => {
      const name = camelize.prepend(context, method); // A => onLeaveA
      if (Reflect.has(methods, name)) {
        Reflect.defineProperty(target.lifeCycle, method, {
          value: methods[name], // define methods
        });
      } else {
        Reflect.defineProperty(target.lifeCycle, method, {
          value: () => {}, // define an empty function for further use
        });
      }
    });
  },
};

//--------------------------------------------------------------------------

const stateMachineProp = {
  is(state) {
    const current = this.state;
    if (state instanceof Array) {
      return state.indexOf(current); // return the current state position
    }
    return current === state;
  },
  canState(state) {
    if (this._isFree()) {
      if (this._getTarget().canState(state)) {
        return true;
      }
      return Reflect.has(this._fsm.states, '*') && Reflect.has(this._fsm.states['*'], state);
    }
    return false;
  },
  canTransition(transition) {
    return this._isFree() ? this._getTarget().canTransition(transition) : false;
  },
  states() {
    const starResult = Reflect.has(this._fsm.states, '*') ? this._fsm.states['*'].getStates() : [];
    return (this._getTarget().getStates()).concat(starResult);
  },
  transitions() {
    const starResult = Reflect.has(this._fsm.states, '*') ? this._fsm.states['*'].getTransitions() : [];
    return (this._getTarget().getTransitions()).concat(starResult);
  },
  allStates() {
    return Object.keys(this._fsm.states);
  },
  allTransitions() {
    return Object.keys(this._fsm.transitions); // get routes series
  },

  //------------------------------------------------------------------------

  goto(state, ...rest) {
    const target = this._getTarget();
    if (target.canState(state)) {
      const transition = target.states[state];
      return this._run(transition, target, rest); // transfer states to transitions
    }
    throw new Error(`State "${state}" is invalid in current state`);
  },

  //------------------------------------------------------------------------

  _getTarget() {
    return this._fsm.states[this._fsm.state]; // get current state target
  },
  _isFree() {
    return this._fsm.runningState === $.FREE;
  },
  _run(transition, that, rest) {
    const fsm = this._fsm;
    const starDetect = () => {
      if (Reflect.has(fsm.states, '*')) {
        return Reflect.has(fsm.states['*'].transitions, transition);
      }
      return false;
    };

    if (fsm.runningState !== $.FREE) {
      throw new Error('Transition is invalid while previous transition is still in progress');
    }

    const target = that || this._getTarget(); // from goto or stateMachine proxy
    const starDetectResult = starDetect();
    if (that || target.canTransition(transition) || starDetectResult) {
      fsm.runningState = $.RUNNING;

      const transitionLifeCycle = fsm.transitions[transition].lifeCycle;
      const enterState = starDetectResult ?
        fsm.states['*'].transitions[transition] :
        target.transitions[transition];
      const enter = fsm.states[enterState].lifeCycle;
      const leave = target.lifeCycle;
      const args = rest || undefined;
      /**
        * transitions: [
        *   { name: 'A', from: 'x', to: 'y' },
        * ]
        *
        * as you can see, when the stateMachine.melt() is called,
        * the steps are as follows:
        *
        *   @param onBeforeA : before transition
        *   @param onLeavex  : leave old state
        *   @param onA       : on transition
        *   @param onEntery  : enter new state
        *   @param onAfterA  : after transition
        *
        *  lack error handler here
        */
      const result = {
        onBefore: transitionLifeCycle.onBefore(args), // run lifecycle function
        onLeave: leave.onLeave(args),
        on: transitionLifeCycle.on(args),
        onEnter: (() => {
          const tmpResult = enter.onEnter(args);
          fsm.state = enterState; // change state after the 'enter' state
          return tmpResult;
        })(),
        onAfter: transitionLifeCycle.onAfter(args), // last step
      };

      fsm.runningState = $.FREE;
      return result;
    }
    throw new Error(`Transition "${transition}" is invalid in current state`);
  },
};

//--------------------------------------------------------------------------

export default function (sm, that) {
  if (!(sm && sm instanceof Object)) {
    throw new Error('Missing state machine main structure');
  }

  const stateMachine = Object.create(stateMachineProp);
  const init = _stateMachine.getInit(sm);
  const methods = _stateMachine.getMethods(sm, that || sm); // bind self without that
  const states = _stateMachine.getStates(sm, methods);
  const transitions = _stateMachine.getTransitions(sm, methods);

  stateMachine._fsm = {
    state: init,
    states,
    transitions,
    runningState: $.FREE,
  }; // generate the _fsm property as a private storage

  Reflect.defineProperty(stateMachine, 'state', {
    configurable: false,
    enumerable: true,
    get() {
      return this._fsm.state;
    },
    set() {
      throw new Error('State cannot be modified directly');
    },
  }); // define the state property to get current state from private storage

  return new Proxy(stateMachine, {
    get(target, property) {
      if (Reflect.has(target, property)) {
        return target[property]; // public property 'state' and private prop _fsm
      }
      return () => target._run(property); // change state by calling the transition's name
    },
    set() {
      throw new Error('Cannot set custom properties on stateMachine directly');
    },
  });
}
