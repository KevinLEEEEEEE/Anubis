cc.Class({
  extends: cc.Component,

  properties: {
    bg: cc.Node,

  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // 获得角色当前的x坐标
    const hero = cc.find('hero');
    this.heroPosition = hero.getPositionX();
    //
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.mousedown, this);
    this.isContract = false;
    this.isDistance = false;
    this.distance = this.node.getPositionX() - this.heroPosition;
  },

  start() {

  },

  update() {
  },
  onBeginContact(contract, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;
    if (otherBody.node._name === 'hero') {
      console.log('anubis is coming');
      this.isContract = true;
    }
  },
  onPreSolve(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;
    if (otherBody.node._name === 'hero') {
      this.distance = Math.abs(this.distance);
      this.isDistance = true;
    }
  },
  // onMouseMove() {
  //  this.node.on('mousemove', () => {
  //
  //  }, this);
  // },
  mousedown() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, () => {
      if (this.isContract && this.isDistance) {
        console.log('我点到了！');
        this.openWindow();
        this.bg.setOpacity(210);
      }
    }, this);
  },
  openWindow() {
    const action = cc.moveTo(0.1, 440, 320);
    const litTheLight = cc.find('litTheLight');
    litTheLight.runAction(action);
    this.bg.setOpacity(210);
    // cc.director.pause();
  },

});
