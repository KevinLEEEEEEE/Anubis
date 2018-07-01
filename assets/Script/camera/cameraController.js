
cc.Class({
  extends: cc.Component,

  properties: {
    target: cc.Node,
    camera: cc.Camera,
    followX: 0,
    followY: 0,
    minFollowDist: 0,
    followRatio: 0,
    minRatio: 0,
    // topBound: 0,
    // bottomBound: 0,
    // leftBound: 0,
    // rightBound: 0,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.startFollow = false;

    this.visibleSize = cc.view.getVisibleSize(); // Returns the visible area size of the view port.
  },

  onEnable() {
    cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
  },

  onDisable() {
    cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
  },


  lateUpdate() {
    const targetPos = this.target.parent.convertToWorldSpaceAR(this.target.position);
    let ratio = 0;
    let distance = 0;

    if (Math.abs(targetPos.x - this.node.x) >= this.followX ||
      Math.abs(targetPos.y - this.node.y) >= this.followY) {
      this.startFollow = true;
    }
    if (this.startFollow) {
      distance = Math.abs(targetPos.x - this.node.x) / (this.visibleSize.width / 2);
      ratio = distance * this.followRatio;

      if (ratio <= this.minRatio) {
        ratio = this.minRatio;
      }

      this.node.position = this.node.position.lerp(targetPos, ratio);

      if (cc.pDistance(targetPos, this.node.position) <= this.minFollowDist) {
        this.startFollow = false;
      }
    }
  },
});
