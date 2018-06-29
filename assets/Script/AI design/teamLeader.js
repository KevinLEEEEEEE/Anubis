import pConfig from './config/personageConfig';
// const blackboardMethods = {
//   subscribe(subscriber) {
//     this.subscribers.add(subscriber);
//     console.log(`subscribe success${subscriber}`);
//   },
//   notify() {
//     const that = this;
//     return (key, message) => {
//       console.log(`get child message and boardcast: ${key} ${message}`);
//       that.subscribers.forEach((subscriber) => {
//         subscriber(key, message);
//       });
//     };
//   },
// };

// const _blackboardMethods = {
//   observe(target, receiver) {
//     if (!target || typeof target !== 'object') {
//       return;
//     }
//     Reflect.ownKeys(target).forEach((key) => {
//       this.defineReactive(target, key, target[key], receiver);
//     });
//   },
//   defineReactive(target, key, value, receiver) {
//     this.observe(target[key], receiver);
//     let currentValue = value;
//     Reflect.defineProperty(target, key, {
//       enumerable: true,
//       configurable: false,
//       get() {
//         return currentValue;
//       },
//       set(newValue) {
//         // notify
//         receiver(key, newValue);
//         currentValue = newValue;
//       },
//     });
//   },
//   getInitBlackboard() {
//     const bb = Object.create(blackboardMethods);
//     bb.subscribers = new Set();
//     return bb;
//   },
// };

// const blackboard = (() => {
//   const bb = _blackboardMethods.getInitBlackboard();
//   return new Proxy(bb, {
//     set: (target, prop, value) => {
//       if (!Reflect.has(target, prop)) {
//         const receiver = bb.notify();
//         _blackboardMethods.observe(value, receiver);
//         Reflect.defineProperty(target, prop, {
//           value,
//         });
//       } else {
//         throw new Error(`${prop} has been defined in IT blackboard`);
//       }
//       return true;
//     },
//   });
// })();

cc.Class({
  extends: cc.Component,

  properties: {
    container: {
      default: null,
      type: cc.Node,
    },
    individual: {
      default: null,
      type: cc.Prefab,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // init node pool(different types of soldier belongs different pool - pool obj?)
    this.initPool(2);

    // listen to the members request
    this.node.on('tEmergencyReq', this.tEmergencyReq, this);
    // create the member list and their states
    // this.members = [];
  },

  start() {
    // create nodes for test
    // this.addNodes();
    this.addNodes();
  },

  initPool(count) {
    this.pool = new cc.NodePool();
    for (let index = 0; index < count; index += 1) {
      const node = cc.instantiate(this.individual);
      this.pool.put(node);
    }
  },

  getPoolNode() {
    let node = null;
    if (this.pool.size() > 0) {
      node = this.pool.get();
    } else {
      node = cc.instantiate(this.individual);
    }
    return node;
  },

  returnPoolNode(node) {
    this.pool.put(node);
  },

  addNodes() {
    const node = this.getPoolNode();
    const type = 'soldier';
    const ID = 11436;
    const config = this.configGenerator(ID, type);
    node.getComponent('individual').init(config);
    node.getComponent('interphone').init(ID);
    // here, if all the init steps works, then add node to the canvas
    node.parent = this.container;
  },

  configGenerator(ID, type) {
    const config = {
      ID,
      type,
      config: pConfig.getMachineGunner(),
    };
    return config;
  },

  tEmergencyReq(event) {
    console.log(event.detail);
    event.target.emit('tEmergencyRes', {
      msg: 'hi',
    });
  },
});
