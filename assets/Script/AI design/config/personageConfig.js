const weaponType = {
  gun: 0,
  machineGun: 1,
  rocket: 2,
};

const _PConfig = {
  villager: {

  },
  enemy: {
    machineGunner: {
      blood: 100,
      speed: 50,
      defense: {
        shield: 150,
      },
      weapon: {
        type: weaponType.machineGun,
        damage: 20,
        shotSpeed: 50,
      },
      detect: {
        range: 100,
      },
    },
  },
};

const _PConfigMethods = {
  defineProp(key, value, receiver) {
    if (typeof value === 'object') {
      Reflect.defineProperty(receiver, key, {
        value: {},
        configurable: true,
        enumerable: true,
      });
      this.deepCopy(value, receiver[key]);
    } else {
      Reflect.defineProperty(receiver, key, {
        value,
        configurable: true,
        enumerable: true,
      });
    }
  },
  deepCopy(target, receiver) {
    Reflect.ownKeys(target).forEach((key) => {
      this.defineProp(key, target[key], receiver);
    });
  },
};

const pConfig = {
  getMachineGunner() {
    const target = _PConfig.enemy.machineGunner;
    const receiver = {};
    _PConfigMethods.deepCopy(target, receiver);
    return receiver;
  },
};

export default pConfig;
