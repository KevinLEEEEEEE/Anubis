import storageManager from '../localStorage/storageManager';
import objectList from '../config/objectList';
import isEqual from '../utils/isEqual';
import logger from '../utils/logger';

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

    this.init();
  },

  init() {
    this.inventoryList = this.pullFromCache();

    logger.INFO('****** init inventoryManager ******');
    logger.DEBUG('inventoryList from cache:', this.inventoryList);

    this.inventoryList.forEach((object) => {
      const { type, level, match } = object;
      this.addNode(type, level, match);
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
      this.state = state.off;
    }, duration);
  },

  // --------------------------------------------------------------------------------------------

  refresh() { // the main refresh function is called when the state changes
    logger.DEBUG(`inventory state change to ${this.state}`);

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
    const { type = 'default', level = '0', match = 'none' } = item; // lack of default option

    this.addNode(type, level, match);

    this.state = state.delyOn;
    // update cache
    // update and show inventory
  },

  addNode(type, level, match) {
    let item = null;
    switch (type) {
    case objectList.decoration:
      break;
    case objectList.key:
      item = cc.instantiate(this.key);
      break;
    default:
    }

    item.getComponent('inventoryObjects').init(type, level, match);

    item.parent = this.container;

    this.addToLocalCache({
      type,
      level,
      match,
    });
  },

  removeNode(info, node) {
    // remove the node fron inventory
    // cc.log(info.node);

    const index = this.inventoryList.findIndex(collection => isEqual(info, collection));

    this.inventoryList.splice(index, 1);

    this.deleteFromLocalCache(info);

    const nodeMethods = node.getComponent('inventoryObjects');

    nodeMethods.remove();
  },

  // --------------------------------------------------------------------------------------------

  addToLocalCache(item) {
    this.inventoryList.push(item);
  },

  deleteFromLocalCache(item) {
    return Reflect.deleteProperty(this.inventoryList, item);
  },

  pullFromCache() {
    return storageManager.readInventoryCache();
  },

  pushToCache() {
    storageManager.writeInventoryCache(this.inventoryList);
  },

  // --------------------------------------------------------------------------------------------

  mousedown(info) {
    if (this.checkInfo !== null) {
      if (this.checkInfo.active === false) {
        this.checkInfo.reject();
        return;
      }

      const { type, level, match } = info;

      if (type === this.checkInfo.require &&
        level === this.checkInfo.level &&
        match === this.checkInfo.match) {
        this.checkInfo.resolve();

        this.removeNode({
          type,
          level,
          match,
        }, info.node);
        // object disappear
        // write into cache
      } else {
        this.checkInfo.reject();
        // nothing happens
      }
      this.checkInfo = null;
    }
  },

  uncheck() {
    if (this.checkInfo !== null) {
      logger.INFO('player leave unlock range');

      this.state = state.off;
      this.checkInfo.active = false;
    }
  },

  check(message) {
    this.state = state.foreverOn;

    logger.INFO('player within unlock range');

    return new Promise((resolve, reject) => {
      this.checkInfo = {
        active: true,
        resolve,
        reject,
        require: message.require,
        level: message.level,
        match: message.match,
      };
    });
  },
});
