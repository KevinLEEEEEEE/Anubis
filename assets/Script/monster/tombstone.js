
cc.Class({
  extends: cc.Component,

  properties: {
    monster: cc.Prefab,
    count: 0,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.monsterPool = new cc.NodePool();

    for (let i = 0; i < this.count; i += 1) {
      const monster = cc.instantiate(this.monster);
      this.monsterPool.put(monster);
    }
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;
    if (otherBody.node.group === 'player') {
      this.monsterWake();
    }
  },

  monsterWake() {
    const monster = this.getMonster();

    monster.parent = this.node;
  },

  getMonster() {
    let monster = null;

    if (this.monsterPool.size() > 0) {
      monster = this.monsterPool.get();
    } else {
      monster = cc.instantiate(this.monster);
    }

    return monster;
  },

  putMonster(monster) {
    this.monsterPool.put(monster);
  },

  // update (dt) {},
});
