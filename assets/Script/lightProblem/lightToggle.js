
cc.Class({
  extends: cc.Component,

  properties: {
    positionX: 0,
    positionY: 0,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
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
    } else {
      this.node.setColor(cc.Color.BLACK);
    }
  },
  getPX(){
    return this.positionX; 
  },
  getPY(){
    return this.positionY; 
  }
});
