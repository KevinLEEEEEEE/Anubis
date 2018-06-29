const stateProperties = {
  addMapItem(state, transition) {
    if (Reflect.has(this.nodeMap, state)) {
      throw new Error('');
    }
    this.nodeMap[state] = transition;
  },
  deleteMapItem(state) {
    return Reflect.deleteProperty(this.nodeMap, state);
  },
};

export default function stateBuilder({ name = 'none', description = 'none' } = {}) {
  const state = {
    name,
    description,
    nodeMap: {},
    lifeCycle: null,
  };

  Reflect.setPrototypeOf(state, stateProperties);

  return state;
}
