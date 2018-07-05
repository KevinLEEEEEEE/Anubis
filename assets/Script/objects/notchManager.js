import storageManager from '../localStorage/storageManager';
import isEqual from '../utils/isEqual';

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

    this.targetPos = cc.v2(0, 0);

    this.init();
  },

  init() {
    this.notchList = this.pullFromCache();

    const { children } = this.node;

    children.forEach((child) => {
      console.log('request notches for init report');

      const methods = child.getComponent('notchObject');
      const info = methods.report();
      if (this.notchList.find(notch => isEqual(notch, info))) {
        methods.unlock();
      }
    });
  },

  // --------------------------------------------------------------------------------------------

  notchDetect(e) {
    const { target } = e;
    const {
      require, match, selfInfo, otherInfo,
    } = e.getUserData();

    e.stopPropagation();

    console.log(`notchManager get detect report from : ${match}`);

    this.inventoryMethods.check({
      require,
      level: this.level,
      match,
    })
      .then(() => {
        console.log('open successfully');

        this.unlockNotch(target); // open the door

        this.addToLocalCache({
          require,
          match,
        });
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
        console.log('notch detection report an out if range message');

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
