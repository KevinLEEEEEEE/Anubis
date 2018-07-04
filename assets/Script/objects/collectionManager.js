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

    const { children } = this.node;

    children.forEach((child) => {
      const methods = child.getComponent('collectionObject');
      const info = methods.report();
      if (this.collectionList.find(collection => this.isEqual(collection, info))) {
        methods.remove();
      }
    });
  },

  isEqual(a, b) {
    let result = true;

    if (Object.keys(a).length !== Object.keys(b).length) {
      result = false;
    }

    Object.keys(a).forEach((key) => {
      if (!(Reflect.has(b, key) && a[key] === b[key])) {
        result = false;
      }
    });

    return result;
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
