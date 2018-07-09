import Game from '../Game';
import isEqual from '../utils/isEqual';
import logger from '../utils/logger';

const Notch = cc.Class({
  name: 'notch',
  properties: {
    match: -1,
    node: cc.Node,
  },
});

cc.Class({
  extends: cc.Component,

  properties: {
    level: 0,
    notchNodeList: {
      default: [],
      type: [Notch],
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on('notchDetect', this.notchDetect, this);
    this.node.on('notchUnDetect', this.notchUnDetect, this);

    const inventory = cc.find('Canvas/inventory');
    this.inventoryMethods = inventory.getComponent('inventoryManager');

    this.initCache();
  },

  initCache() {
    this.notchList = this.pullFromCache();

    logger.INFO('****** init notchManager ******');
    logger.DEBUG('notchList from cache:', this.notchList);

    this.notchNodeList.forEach((nNode) => {
      const { match, node } = nNode; // set the default

      if (this.isUnlocked({ match })) {
        node.getComponent('notchObject').remove();
      } else {
        node.getComponent('notchObject').init({ match });
      }
    });
  },

  isUnlocked(info) {
    let result = false;

    this.notchList.forEach((notch) => {
      if (isEqual(notch, info)) {
        result = true;
      }
    });
    return result;
  },

  // --------------------------------------------------------------------------------------------

  notchDetect(e) {
    const { target } = e;
    const info = e.getUserData();

    e.stopPropagation();

    logger.INFO(`notchManager reveive contact event from: ${info.match}`);

    this.inventoryMethods.check({
      match: info.match,
      level: this.level,
    })
      .then(() => {
        logger.INFO('notch unlock successfully');

        this.unlockNotch(target); // unlock the notch

        this.addToLocalCache(info);
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
    return Game.getNotchCache(this.level);
  },

  pushToCache() {
    Game.setNotchCache(this.notchList, this.level);
  },

  // update (dt) {},
});
