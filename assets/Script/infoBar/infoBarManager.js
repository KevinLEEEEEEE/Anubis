import logger from '../utils/logger';

cc.Class({
  extends: cc.Component,

  properties: {
    bloodPrefab: cc.Prefab,
  },

  // LIFE-CYCLE CALLBACKS:

  init(amount) {
    logger.INFO('****** init infoBarManager ******');

    this.bloodPool = new cc.NodePool();

    for (let i = 0; i < amount; i += 1) {
      const blood = cc.instantiate(this.bloodPrefab);
      this.bloodPool.put(blood);
    }
  },

  getBloodNode() {
    let blood = null;

    if (this.bloodPool.size() > 0) {
      blood = this.bloodPool.get();
    } else {
      blood = cc.instantiate(this.bloodPrefab);
    }

    return blood;
  },

  putBloodNode(blood) {
    this.bloodPool.put(blood);
  },

  updateInfoBar(info) {
    logger.INFO('init infoBar icon');

    const { blood } = info;
    const current = this.node.children.length;

    if (blood > current) {
      const gap = blood - current;
      for (let i = 0; i < gap; i += 1) {
        const bloodNode = this.getBloodNode();

        bloodNode.parent = this.node;
      }
    } else if (blood < current) {
      const gap = current - blood;
      for (let i = 0; i < gap; i += 1) {
        const childrenList = this.node.children;
        const bloodNode = childrenList[childrenList.length - 1];

        this.putBloodNode(bloodNode);
      }
    }
  },

  // update (dt) {},
});
