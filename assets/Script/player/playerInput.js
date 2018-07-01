
cc.Class({
  extends: cc.Component,

  properties: {

  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.motion = this.getComponent('playerMotions');

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },

  onKeyDown(event) {
    const { keyCode } = event;
    switch (keyCode) {
    case cc.KEY.a:
    case cc.KEY.left:
      this.motion.left();
      break;
    case cc.KEY.d:
    case cc.KEY.right:
      this.motion.right();
      break;
    case cc.KEY.w:
    case cc.KEY.up:
      this.motion.up();
      break;
    default:
    }
  },

  onKeyUp(event) {
    const { keyCode } = event;
    switch (keyCode) {
    case cc.KEY.a:
    case cc.KEY.left:
    case cc.KEY.d:
    case cc.KEY.right:
      this.motion.stand();
      break;
    case cc.KEY.w:
    case cc.KEY.up:
      this.motion.down();
      break;
    default:
    }
  },
});
