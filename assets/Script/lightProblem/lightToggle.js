
cc.Class({
  extends: cc.Component,

  properties: {
    // isColor: 0,
    position: '00',
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.Problem = this.node.parent.getComponent('litTheLight');
    this.num = this.Problem.getWhiteNum();
    this.isLight = false;
  },

  start() {

  },

  // update() {
  // },
  lightToggle() {
    this.isLight = !this.isLight;
    if (this.isLight === true) {
      this.node.setColor(cc.Color.WHITE);
      this.num = this.num + 1;
      if (this.num === 9) {
        const action = cc.moveTo(0.1, 1000, 1000);
        const litTheLight = cc.find('litTheLight');
        litTheLight.runAction(action);
        const bg = cc.find('backGround');
        bg.setOpacity(0);
      }
    } else {
      this.node.setColor(cc.Color.BLACK);
      this.num = this.num - 1;
    }
  },
});
