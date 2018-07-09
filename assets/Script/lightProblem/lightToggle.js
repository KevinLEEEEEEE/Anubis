
cc.Class({
  extends: cc.Component,

  properties: {
    positionX: 0,
    positionY: 0,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.isLight = false;
    this.window = cc.find('litTheLight');
  },

  start() {

  },

  // update() {
  // },
  lightUp() {
    this.node.setColor(cc.Color.WHITE);
  },
  lightOff() {
    this.node.setColor(cc.Color.BLACK);
  },
  getPX() {
    return this.positionX;
  },
  getPY() {
    return this.positionY;
  },
});
