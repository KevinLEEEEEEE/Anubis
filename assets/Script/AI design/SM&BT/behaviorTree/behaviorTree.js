// const behaviorTree(that) {

// };

export default function behaviorTreeBuilder() {
  const bt = {};

  const builder = {
    activeSelector() {
      console.log('activeSelector');
      bt.hi = 'hi';
      return this;
    },
    sequence() {
      console.log('activeSelector');
      return this;
    },
    action() {
      console.log('activeSelector');
      return this;
    },
    end() {
      console.log('end');
      return this;
    },
    finish() {
      return bt;
    },
  };

  return Object.create(builder);
}
