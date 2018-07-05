import logger from '../utils/logger';

cc.Class({
  extends: cc.Component,

  properties: {
    bloodPrefab: cc.Prefab,
  },

  // LIFE-CYCLE CALLBACKS:

  init(amount) {
    this.bloodPool = new cc.NodePool();

    for (let i = 0; i < amount; i += 1) {
      const blood = cc.instantiate(this.bloodPrefab);
      this.bloodPool.put(blood);
    }
  },

  updateInfoBar(info) {
    const { blood } = info;
  },

  // update (dt) {},
});
