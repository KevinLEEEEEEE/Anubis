import storageManager from '../localStorage/storageManager';
import objectList from '../config/objectList';

const state = cc.Enum({
  off: 0,
  foreverOn: 1,
  delyOn: 2,
  delyOnPause: 3,
});

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
    const visibleSize = cc.view.getVisibleSize(); // Returns the visible area size of the view port.

    this.showY = -visibleSize.height / 2;

    this.hideY = this.showY - this.node.height;

    this.x = this.node.position.x;

    this.node.on(cc.Node.EventType.MOUSE_ENTER, this.mouseEnter, this);
    this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.mouseLeave, this);

    this.onSchedule = null;

    this.checkInfo = null;

    const that = this;

    Reflect.defineProperty(this, 'state', {
      configurable: false,
      enumerable: true,
      get() {
        return this.cache || state.off;
      },
      set(cState) {
        this.cache = cState;
        that.refresh();
      },
    });
  },

  // --------------------------------------------------------------------------------------------

  toggle() { // the btn controls toggle function
    if (this.state === state.off) {
      this.state = state.foreverOn;
    } else {
      this.state = state.off;
    }
  },

  detect(notch) { // whe the plsyer nock the key hole
    this.state = state.foreverOn;
    this.notch = notch;
  },

  mouseEnter() {
    if (this.state === state.delyOn) {
      this.state = state.delyOnPause;
    }
  },

  mouseLeave() {
    if (this.state === state.delyOnPause) {
      this.state = state.delyOn;
    }
  },

  // --------------------------------------------------------------------------------------------

  show() {
    this.node.position = cc.v2(this.x, this.showY);
  },

  hide() {
    this.node.position = cc.v2(this.x, this.hideY);
  },

  clear() {
    if (this.onSchedule !== null) {
      clearTimeout(this.onSchedule); // reset the clock when the object is obtained
    }
  },

  delyHide(duration) {
    this.onSchedule = setTimeout(() => {
      this.hide();
    }, duration);
  },

  // --------------------------------------------------------------------------------------------

  refresh() { // the main refresh function is called when the state changes
    switch (this.state) {
    case state.off:
      this.off();
      break;
    case state.foreverOn:
      this.foreverOn();
      break;
    case state.delyOn:
      this.delyOn();
      break;
    case state.delyOnPause:
      this.delyOnPause();
      break;
    default:
      this.off();
    }
  },

  off() {
    this.clear();
    this.hide();
  },

  foreverOn() {
    this.clear();
    this.show();
  },

  delyOn() {
    this.clear();
    this.show();
    this.delyHide(this.duration);
  },

  delyOnPause() {
    this.clear();
  },

  // --------------------------------------------------------------------------------------------

  add(item) {
    const { type, match } = item;

    this.addNode(type, match);

    this.state = state.delyOn;
    // update cache
    // update and show inventory
  },

  addNode(type, match) {
    let item = null;
    switch (type) {
    case objectList.decoration:
      break;
    case objectList.key:
      item = cc.instantiate(this.key);
      break;
    default:
    }

    item.getComponent('inventoryObjects').init(type, match);

    item.parent = this.container;
  },

  removeNode(node) {
    node.active = false;
  },

  // --------------------------------------------------------------------------------------------

  readObjectsCache() {
    return storageManager.readObjectsCache();
  },

  writeObjectsCache(list) {
    storageManager.writeObjectsCache(list);
  },

  // --------------------------------------------------------------------------------------------

  mousedown(info) {
    if (this.checkInfo !== null) {
      console.log(info.match, this.checkInfo.match);
      if (info.match === this.checkInfo.match) {
        this.checkInfo.resolve();

        this.removeNode(info.node);
        // object disappear
        // write into cache
      } else {
        this.checkInfo.reject();
        // nothing happens
      }
      this.checkInfo = null;
    }
  },

  check(message) {
    this.state = state.foreverOn;

    return new Promise((resolve, reject) => {
      this.checkInfo = {
        resolve,
        reject,
        match: message.match,
      };
    });
  },
});
