cc.Class({
  extends: cc.Component,

  properties: {
    bg: cc.Node,

  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.hero = cc.find('hero');
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.mousedown, this);
    this.isContract = false;
    this.isDistance = false;
  },

  start() {

  },

  update() {
  },
  onBeginContact(contract, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;
    if (otherBody.node._name === 'hero') {
      this.isContact = true;
    }
    this.schedule(() => {
      this.heroPosition = this.hero.getPositionX();
      this.distance = Math.abs(this.node.getPositionX() - this.heroPosition);
      if (otherBody.node._name === 'hero' && this.distance <= 100) {
        this.isDistance = true;
      }
    }, 0.5);
  },
  // onMouseMove() {
  //  this.node.on('mousemove', () => {
  //
  //  }, this);
  // },
  mousedown() {
    if (this.isContact && this.isDistance) {
      console.log('弹出问题');
      this.openWindow();
      this.bg.setOpacity(210);
    }
  },
  openWindow() {
    const action = cc.moveTo(0.1, 440, 320);
    const litTheLight = cc.find('litTheLight');
    litTheLight.runAction(action);
    this.bg.setOpacity(210);
    // cc.director.pause();
  },

});
