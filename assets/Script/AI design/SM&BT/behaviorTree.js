import { btNode as $, btState as $$ } from '../config/btNode';

const btNodeProperty = {
  [$.SELECTOR]: {
    run() {
      for (let i = 0; i < this.children.length; i += 1) {
        if (this.children[i].run()) {
          return true;
        }
      }
      return false;
    },
  },
  [$.SEQUENCE]: {
    run() {
      for (let i = 0; i < this.children.length; i += 1) {
        if (!this.children[i].run()) {
          return false;
        }
      }
      return true;
    },
  },
  [$.PARALLEL]: {
    run() {
      const methods = this.children;
      let result = true;
      methods.forEach((method) => {
        result = result && method();
      });
      return result;
    },
  },
};

const _behaviorTree = {
  getNodePrototype(name, type, BT, bt, that) {
    switch (type) {
      case $.SELECTOR:
      case $.SEQUENCE:
      case $.PARALLEL:
        return btNodeProperty[type];
      case $.CONDITION:
        return { run: bt.condition[name].bind(BT) };
      case $.ACTION:
        return { run: bt.action[name].bind(that) };
      default:
    }
    return false;
  },
  getStructure(BT, bt, that) {
    let root = null;
    let parents = {};
    let children = {};

    bt.structure.forEach((items, i) => {
      items.forEach((item, j) => {
        const node = {};
        const { name, type, parent } = item;
        const prototype = this.getNodePrototype(name, type, BT, bt, that);
        Reflect.setPrototypeOf(node, prototype);
        node.name = name; // important! save the name as the name of k, c and m
        node.type = type; // save its type for further use(no use recently)
        node.state = $$.COMPLETED; // init the default state of the node
        node.children = []; // set children for further call
        if (Reflect.has(parents, parent)) {
          parents[parent].children.push(node); // become child of parent
          children[name] = node;
          console.log(`define '${item.name}' as child of '${parent}' successfully`);
        } else if (i === 0 && j === 0) {
          root = node; // the root node
          children[name] = node;
          console.log('define root successfully');
        } else {
          throw new Error(`Can't find parent '${item.parent}' of '${item.name}'`);
        }
      });
      parents = children; // important! exchange the direction of variables
      children = {}; // important! keep the previous level nodes as parents of next level
    });

    return root;
  },
};

const behaviorTreePrototype = {
  update(knowledge) {
    console.log(knowledge);
    // to update the knowledge ,using a formated object
  },
  run() {
    this.structure.run(); // to run the behaviour tree
  },
};

export default function newBehaviorTree(bt, that) {
  const BT = Object.create(behaviorTreePrototype);

  Object.keys(bt).forEach((key) => {
    switch (key) {
      case 'structure': {
        const structure = _behaviorTree.getStructure(BT, bt, that);
        Object.freeze(structure); // set the tree structed object as new structure
        BT[key] = structure;
        break;
      }
      case 'knowledge': {
        Object.seal(bt[key]); // ensure the original properties can't be deleted or added
        BT[key] = bt[key]; // but the data can still be changed
        break;
      }
      case 'condition':
      case 'action': {
        break;
      }
      default: {
        throw new Error(`the key: ${key} is not the required property of BT`);
      }
    }
  });

  return (knowledge, run) => {
    if (knowledge !== null && typeof knowledge === 'object') {
      BT.update(knowledge);
    }
    if (run) {
      BT.run();
    }
  };
}
