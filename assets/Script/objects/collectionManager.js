import Game from '../Game';
import isEqual from '../utils/isEqual';
import logger from '../utils/logger';

const Collection = cc.Class({
  name: 'collection',
  properties: {
    match: -1,
    node: cc.Node,
  },
});

cc.Class({
  extends: cc.Component,

  properties: {
    level: 0,
    inventory: cc.Node,
    collectionNodeList: {
      default: [],
      type: [Collection],
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    logger.INFO('****** CollectionManager init start ******');

    this.node.on('collectionDetect', this.collectionDetect, this);

    this.inventoryMethods = this.inventory.getComponent('inventoryManager');

    this.initCache();

    logger.INFO('****** CollectionManager init end ******');
  },

  initCache() {
    this.collectionList = this.pullFromCache();

    logger.DEBUG('collectionList from cache:', this.collectionList);

    this.collectionNodeList.forEach((cNode) => {
      const { match, node } = cNode; // set the default

      if (this.isCollected({ match })) {
        node.getComponent('collectionObject').remove();
      } else {
        node.getComponent('collectionObject').init({ match });
      }
    });
  },

  isCollected(info) {
    let result = false;

    this.collectionList.forEach((collection) => {
      if (isEqual(collection, info)) {
        result = true;
      }
    });

    return result;
  },

  // --------------------------------------------------------------------------------------------

  collectionDetect(e) {
    const message = e.getUserData();

    e.stopPropagation();

    this.inventoryAdd(message);
  },

  inventoryAdd(info) {
    this.addToLocalCache(info);

    this.inventoryMethods.add(Object.assign(info, {
      level: this.level,
    })); // add to the inventory with level data
  },

  // --------------------------------------------------------------------------------------------

  addToLocalCache(item) {
    this.collectionList.push(item);

    this.pushToCache(); // save btn required
  },

  pullFromCache() {
    return Game.getCollectionCache(this.level);
  },

  pushToCache() {
    Game.setCollectionCache(this.collectionList, this.level);
  },
});
