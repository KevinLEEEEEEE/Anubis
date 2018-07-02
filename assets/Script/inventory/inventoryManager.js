import storageManager from '../localStorage/storageManager';

cc.Class({
  extends: cc.Component,

  properties: {
    key: cc.Prefab,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // read from chche
    this.visibility = false;

    const visibleSize = cc.view.getVisibleSize(); // Returns the visible area size of the view port.

    this.showY = -visibleSize.height / 2;

    this.hideY = this.showY - this.node.height;

    this.x = this.node.position.x;
  },

  add(item) {
    console.log(item);
    // update cache
    // update and show inventory
  },

  toggle() {
    this.visibility = !this.visibility;
    if (this.visibility) {
      this.show();
    } else {
      this.hide();
    }
  },

  show() {
    this.node.position = cc.v2(this.x, this.showY);
  },

  hide() {
    this.node.position = cc.v2(this.x, this.hideY);
  },

  addNode() {

  },

  removeNode() {

  },

  readObjectsCache() {

  },

  writeObjectsCache() {

  },
});
