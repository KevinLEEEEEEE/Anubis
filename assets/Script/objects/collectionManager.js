import storageManager from '../localStorage/storageManager';
import objectList from '../config/objectList';
import isEqual from '../utils/isEqual';
import logger from '../utils/logger';

cc.Class({
  extends: cc.Component,

  properties: {
    level: 0,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on('collectionDetect', this.collectionDetect, this);

    const inventory = cc.find('Canvas/inventory');
    this.inventoryMethods = inventory.getComponent('inventoryManager');

    this.init();
  },

  init() {
    this.collectionList = this.pullFromCache();

    logger.INFO('****** init collectionManager  ******');
    logger.DEBUG('collectionList from cache:', this.collectionList);

    const { children } = this.node;

    children.forEach((child) => {
      const methods = child.getComponent('collectionObject');
      const info = methods.report();
      if (this.collectionList.find(collection => isEqual(collection, info))) {
        methods.remove();
      }
    });
  },

  // --------------------------------------------------------------------------------------------

  collectionDetect(e) {
    const message = e.getUserData();
    const { type, match, recovery } = message;

    e.stopPropagation();

    switch (type) {
    case objectList.key:
      this.inventoryAdd(type, match);
      break;
    case objectList.blood:
      this.bloodAdd(type, match, recovery);
      break;
    case objectList.fragment:
      this.fragmentAdd(type, match);
      break;
    default:
    }
  },

  inventoryAdd(type, match) {
    const inventory = cc.find('Canvas/inventory');
    const inventoryMethods = inventory.getComponent('inventoryManager');

    inventoryMethods.add({
      type,
      level: this.level,
      match,
    }); // add to the inventory

    this.addToLocalCache({
      type,
      match,
    });
  },

  bloodAdd() {

  },

  fragmentAdd() {

  },

  // --------------------------------------------------------------------------------------------

  addToLocalCache(item) {
    this.collectionList.push(item);

    this.pushToCache(); // save btn required
  },

  pullFromCache() {
    return storageManager.readLevelCollectionCache(this.level);
  },

  pushToCache() {
    storageManager.writeLevelCollectionCache(this.level, this.collectionList);
  },

  // update (dt) {},
});
