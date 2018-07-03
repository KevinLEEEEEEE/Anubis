import storageManager from '../localStorage/storageManager';

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on('notchDetect', this.notchDetect, this);

    const inventory = cc.find('Canvas/inventory');
    this.inventoryMethods = inventory.getComponent('inventoryManager');

    this.init();
  },

  init() {

  },

  notchDetect(e) {
    const { target } = e;
    const message = e.getUserData();

    this.inventoryMethods.check(message)
      .then(() => {
        console.log('open successfully');

        this.unlockNotch(target);
        // door open
        // write into cache
      }, () => {
        console.log('failed to open the door');
      });
  },

  unlockNotch(target) {
    const notchMethods = target.getComponent('notchObject');

    notchMethods.unlock();
  },

  // update (dt) {},
});