import storageManager from '../localStorage/storageManager';
import objectList from '../config/objectList';

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

    console.log(this.collectionList);
  },

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
  },

  bloodAdd() {

  },

  fragmentAdd() {

  },

  pullFromCache() {
    return storageManager.readLevelCollectionCache(this.level);
  },

  pushToCache() {
    storageManager.writeLevelCollectionCache(this.level, this.collectionList);
  },

  // update (dt) {},
});
