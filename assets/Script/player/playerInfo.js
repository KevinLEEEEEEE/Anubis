import storageManager from '../localStorage/storageManager';
import logger from '../utils/logger';

cc.Class({
  extends: cc.Component,

  properties: {
    bloodDefault: 5,
    infoBar: cc.Node,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.infoBarMethods = this.infoBar.getComponent('infoBarManager');

    this.infoBarMethods.init(this.bloodDefault);

    this.init();
  },

  init() {
    // read from cache
    Reflect.defineProperty(this, 'blood', {
      configurable: false,
      enumerable: true,
      get() {
        return this.bloodCache;
      },
      set(value) {
        this.bloodCache = value;
        logger.DEBUG(`current blood: ${this.bloodCache}, begin check and update`);
        this.checkBlood();
        this.updateInfoBar();
      },
    });

    logger.INFO('Init the "blood" property in playerInfo');
    logger.DEBUG(`blood amount from default: ${this.bloodDefault}`);

    this.blood = 5; // read from cache

    logger.DEBUG(`blood amount from cache: ${this.blood}`);
  },

  loseHealth(amount = 1) {
    this.blood -= amount;
    // animation

    logger.INFO('lose health');

    this.checkBlood();
  },

  gainHealth(amount = 1) {
    this.blood -= amount;
    // animation

    logger.INFO('gain health');

    this.checkBlood();
  },

  checkBlood() {
    if (this.blood > this.bloodDefault) {
      this.blood = this.bloodDefault;
    } else if (this.blood <= 0) {
      this.dead();
    }
  },

  updateInfoBar() {
    this.infoBarMethods.updateInfoBar({
      blood: this.blood,
    });
  },

  dead() {
    logger.INFO('player dead');
  },

  pullFromCache() {
    return storageManager.readLevelCollectionCache(this.level);
  },

  pushToCache() {
    storageManager.writeLevelCollectionCache(this.level, this.collectionList);
  },

  // update (dt) {},
});
