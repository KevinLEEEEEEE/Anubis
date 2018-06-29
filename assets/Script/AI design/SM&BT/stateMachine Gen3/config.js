const configProperties = {
  configureLifecycle() {

  },
  configureInitTransition() {

  },
  configureData() {

  },
  configureMethods() {

  },
};

export default function (options) {
  const config = {
    states: [],
    transitions: [],
    map: {},
    lifecycle: this.configureLifecycle(),
    init: this.configureInitTransition(options.init),
    data: this.configureData(options.data),
    methods: this.configureMethods(options.methods),
  };

  Reflect.setPrototypeOf(config, configProperties);

  return config;
}
