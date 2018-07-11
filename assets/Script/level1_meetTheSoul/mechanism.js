cc.Class({
  extends: cc.Component,

  properties: {
    bg: cc.Node,
    litTheLight: cc.Node,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.mousedown, this);
    this.isContact = false;

    this.lightMethods = this.litTheLight.getComponent('litTheLight');

    this.node.on('unlock', this.unlock, this); // listen to unlock event from parent
  },

  onBeginContact(contract, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;
    if (otherBody.node.group === 'player') {
      this.isContact = true;
    }
  },
  onEndContact(contract, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;
    if (otherBody.node.group === 'player') {
      this.isContact = false;
    }
  },

  mousedown() {
    console.log('点到了');
    if (this.isContact) {
      console.log('弹出问题');
      this.openWindow();
      this.bg.setOpacity(210);
    }
  },

  openWindow() {
    const action = cc.moveTo(0.1, 505, 309);
    this.litTheLight.runAction(action);
    this.bg.setOpacity(210);
    // cc.director.pause();
  },

  unlock() {
    this.lightMethods.unlock();
  },

});
