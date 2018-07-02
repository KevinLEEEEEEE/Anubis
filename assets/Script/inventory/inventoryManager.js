import storageManager from '../localStorage/storageManager';
import objectList from '../config/objectList';

cc.Class({
  extends: cc.Component,

  properties: {
    key: cc.Prefab,
    container: cc.Node,
    duration: 0,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // read from chche
    this.visibility = false;

    const visibleSize = cc.view.getVisibleSize(); // Returns the visible area size of the view port.

    this.showY = -visibleSize.height / 2;

    this.hideY = this.showY - this.node.height;

    this.x = this.node.position.x;

    this.onSchedule = null;

    this.btnControl = false;

    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.selectItem, this);
  },

  add(item) {
    const { type, info } = item;

    this.addNode(type, info);
    this.show(this.duration);
    // update cache
    // update and show inventory
  },

  toggle() {
    this.clear();

    if (!this.visibility) {
      this.btnControl = true; // the btn has the supreme authority
      this.show();
    } else {
      this.btnControl = false;
      this.hide();
    }
  },

  show(duration) {
    this.visibility = true;

    this.node.position = cc.v2(this.x, this.showY);

    if (typeof duration === 'number' && !this.btnControl) {
      this.clear();

      this.onSchedule = setTimeout(() => {
        this.hide();
      }, duration);
    }
  },

  hide() {
    this.visibility = false;

    this.node.position = cc.v2(this.x, this.hideY);
  },

  clear() {
    if (this.onSchedule !== null) {
      clearTimeout(this.onSchedule); // reset the clock when the object is obtained
    }
  },

  addNode(type, info) {
    let item = null;
    switch (type) {
    case objectList.decoration:
      break;
    case objectList.key:
      item = cc.instantiate(this.key);
      break;
    default:
    }

    item.getComponent('objectControl').init(type, info);

    item.parent = this.container;
  },

  removeNode() {

  },

  selectItem(e) {
    console.log(e.target.info);
  },

  readObjectsCache() {
    return storageManager.readObjectsCache();
  },

  writeObjectsCache(list) {
    storageManager.writeObjectsCache(list);
  },
});
