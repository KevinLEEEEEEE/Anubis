import Game from '../Game';
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
    showY: 0,
    hideY: 0,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    logger.INFO('****** inventoryManager init start ******');

    // read from chche
    this.x = this.node.position.x;

    this.node.on(cc.Node.EventType.MOUSE_ENTER, this.mouseEnter, this);
    this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.mouseLeave, this);
    this.node.on('runCheck', this.runCheck, this);

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

    this.initCache();

    logger.INFO('****** inventoryManager init end ******');
  },

  initCache() {
    this.inventoryList = this.pullFromCache();

    logger.DEBUG('inventoryList from cache:', this.inventoryList);

    this.inventoryList.forEach((object) => {
      this.addIcon(object);
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

  add(info) {
    this.addIcon(info);

    this.addToLocalCache(info);

    this.state = state.delyOn; // the change of state cause the inventory to change automatically
  },

  addIcon(info) {
    const item = cc.instantiate(this.key);

    item.getComponent('inventoryObjects').init(info);

    item.parent = this.container;
  },

  remove(info, node) {
    // remove the node icon from the inventory interface
    this.removeIcon(node);

    this.deleteFromLocalCache(info);

    this.pushToCache(); // CAUTION! unnecessary in the future
  },

  removeIcon(node) {
    const nodeMethods = node.getComponent('inventoryObjects');

    nodeMethods.remove();
  },

  // --------------------------------------------------------------------------------------------

  addToLocalCache(item) {
    this.inventoryList.push(item);
  },

  deleteFromLocalCache(info) {
    const index = this.inventoryList.findIndex(collection => isEqual(info, collection));

    this.inventoryList.splice(index, 1);
  },

  pullFromCache() {
    // return storageManager.readInventoryCache();
    return Game.getInventoryCache();
  },

  pushToCache() {
    // storageManager.writeInventoryCache(this.inventoryList);
    Game.setInventoryCache(this.inventoryList);
  },

  // --------------------------------------------------------------------------------------------

  runCheck(e) {
    e.stopPropagation();

    if (this.checkInfo !== null) {
      const node = e.target;
      const info = e.getUserData();

      if (isEqual(info, this.checkInfo.info)) {
        this.checkInfo.resolve(); // unlock successfully

        this.remove(info, node);
      } else {
        this.checkInfo.reject(); // nothing to happen
      }
    }
  },

  uncheck() {
    if (this.checkInfo !== null) {
      logger.INFO(`player leave unlock range, notch number: ${this.checkInfo.info.match}`);

      this.state = state.off;
      this.checkInfo = null;
    }
  },

  check(message) {
    this.state = state.foreverOn;

    return new Promise((resolve, reject) => {
      this.checkInfo = {
        resolve,
        reject,
        info: message,
      };

      logger.INFO(`player within unlock range, notch number: ${this.checkInfo.info.match}`);
    });
  },
});
