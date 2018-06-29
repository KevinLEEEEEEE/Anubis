const tickprop = {
  _enterNode(node) {
    this._nodeCount += 1;
    this._openNodes.push(node);
  },

  _openNode(node) {

  },

  _tickNode(node) {

  },

  _closeNode(node) {
    this._openNodes.pop();
  },

  _exitNode(node) {

  },
};


export default function () {
  const tick = {
    _openNodes: [],
    _nodeCount: 0,
  };
  return Object.assign(tick, Object.create(tickprop));
}
