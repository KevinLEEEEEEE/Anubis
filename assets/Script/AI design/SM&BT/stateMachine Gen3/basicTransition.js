const transitionProperties = {

};

export default function stateBuilder({ name = 'none', description = 'none' } = {}) {
  const transition = {
    name,
    description,
    transitionMap: {},
    lifeCycle: null,
  };

  Reflect.setPrototypeOf(transition, transitionProperties);

  return transition;
}
