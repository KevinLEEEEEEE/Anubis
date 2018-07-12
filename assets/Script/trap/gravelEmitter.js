cc.Class({
  extends: cc.Component,

  properties: {
    gravelPrefab: cc.Prefab,
    intervalTime: 1.5,
    fallingSpeed: 500,
  },

  onLoad() {
    this.positionX = this.node.getPositionX();
    this.positionY = this.node.getPositionY();
    this.initGravelPool();
    this.fallingEvent();
  },

  initGravelPool() {
    this.gravelPool = new cc.NodePool();
    for (let i = 0; i <= 5; i += 1) {
      const gravel = cc.instantiate(this.gravelPrefab);
      this.gravelPool.put(gravel);
    }
  },

  getGravel() {
    let gravel = null;
    if (this.gravelPool.size() > 0) {
      gravel = this.gravelPool.get();
    } else {
      gravel = cc.instantiate(this.gravelPrefab);
    }
    gravel.getComponent('gravel').init(this, this.node.convertToNodeSpace(this.positionX, this.positionY), this.fallingSpeed);
    return gravel;
  },

  putGravel(gravel) {
    this.gravelPool.put(gravel);
  },

  fallingEvent() {
    this.schedule(() => {
      const gravel = this.getGravel();
      gravel.parent = this.node;
      cc.log('发射啦！');
    }, this.intervalTime, this);
  },
});
