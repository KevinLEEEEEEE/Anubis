import storageManager from '../localStorage/storageManager';
import isEqual from '../utils/isEqual';
import logger from '../utils/logger';

cc.Class({
  extends: cc.Component,

  properties: {
    level: 0,
    distance: 200,
    detectRate: 1,
    player: cc.Node,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on('notchDetect', this.notchDetect, this);
    this.node.on('notchUnDetect', this.notchUnDetect, this);

    const inventory = cc.find('Canvas/inventory');
    this.inventoryMethods = inventory.getComponent('inventoryManager');

    this.targetPos = cc.v2(0, 0);

    this.init();
  },

  init() {
    this.notchList = this.pullFromCache();

    logger.INFO('****** init notchManager ******');
    logger.DEBUG('notchList from cache:', this.notchList);

    const { children } = this.node;

    children.forEach((child) => {
      const methods = child.getComponent('notchObject');
      const info = methods.report();
      if (this.notchList.find(notch => isEqual(notch, info))) {
        logger.INFO(`request from notch manager to unlock notch: ${info.match}`);
        methods.unlock();
      }
    });
  },

  // --------------------------------------------------------------------------------------------

  notchDetect(e) {
    const { target } = e;
    const { require, match } = e.getUserData();

    e.stopPropagation();

    logger.INFO(`notchManager reveive contact event from: ${match}`);

    this.inventoryMethods.check({
      require,
      level: this.level,
      match,
    })
      .then(() => {
        logger.INFO('notch unlock successfully');

        this.unlockNotch(target); // unlock the notch

        this.addToLocalCache({
          require,
          match,
        });
      }, () => {
        logger.INFO('notch unlock failed');
        // nothing happened
      });
  },

  notchUnDetect() {
    this.inventoryMethods.uncheck();
  },

  unlockNotch(target) {
    const notchMethods = target.getComponent('notchObject');

    notchMethods.unlock();
  },

  // --------------------------------------------------------------------------------------------

  addToLocalCache(item) {
    this.notchList.push(item);

    this.pushToCache(); // save btn required
  },

  pullFromCache() {
    return storageManager.readLevelNotchCache(this.level) || {};
  },

  pushToCache() {
    storageManager.writeLevelNotchCache(this.level, this.notchList);
  },

  // update (dt) {},
});
