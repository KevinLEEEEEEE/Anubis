import storageManager from '../localStorage/storageManager';

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

    const inventory = cc.find('Canvas/inventory');
    this.inventoryMethods = inventory.getComponent('inventoryManager');

    this.init();
  },

  init() {
    this.targetPos = cc.v2(0, 0);
  },

  notchDetect(e) {
    const { target } = e;
    const {
      require, match, selfInfo, otherInfo,
    } = e.getUserData();

    e.stopPropagation();

    this.inventoryMethods.check({
      require,
      level: this.level,
      match,
    })
      .then(() => {
        console.log('open successfully');

        this.unlockNotch(target);
        // door open
        // write into cache
      }, () => {
        console.log('failed to open the door');
        // nothing happened
      });

    this.timigDetection(target, selfInfo, otherInfo);
  },

  notchUnDetect() {
    this.inventoryMethods.uncheck();
  },

  timigDetection(target, selfInfo, otherInfo) {
    const targetPos = target.convertToWorldSpaceAR(target.getPosition());

    const { width: targetWidth } = selfInfo;
    const { width: otherWidth } = otherInfo;

    const totalWidth = targetWidth + otherWidth;

    const callBack = () => {
      const playerPos = this.player.convertToWorldSpaceAR(this.player.getPosition());

      const distance = cc.pDistance(playerPos, targetPos);
      const touchDistance = (totalWidth ** 2) + ((playerPos.y - targetPos.y) ** 2);

      if (distance ** 2 > touchDistance) {
        this.notchUnDetect();
        this.unschedule(callBack);
      }
    };

    this.schedule(callBack, this.detectRate);
  },

  unlockNotch(target) {
    const notchMethods = target.getComponent('notchObject');

    notchMethods.unlock();
  },

  pullFromCache() {
    return storageManager.readLevelNotchCache(this.level) || {};
  },

  pushToCache() {
    storageManager.writeLevelNotchCache(this.level, this.notchList);
  },

  // update (dt) {},
});
