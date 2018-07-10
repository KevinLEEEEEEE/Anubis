import logger from '../utils/logger';

cc.Class({
  extends: cc.Component,

  onLoad() {
    if (this.unlock) {
      this.node.emit('unlock');
    }
  },

  init(info) {
    this.info = info;

    this.node.on('unlockRegister', this.unlockRegister, this);
  },

  onDisable() {
    this.node.off('unlockRegister', this.unlockRegister, this);
  },

  onBeginContact() {
    logger.INFO('player contact notch');

    this.notchDetect();
  },

  onEndContact() {
    logger.INFO('player discontact notch');

    this.notchUnDetect();
  },

  notchDetect() {
    const event = new cc.Event.EventCustom('notchDetect', true);

    event.setUserData(this.info);

    this.node.dispatchEvent(event);
  },

  notchUnDetect() {
    const event = new cc.Event.EventCustom('notchUnDetect', true);

    this.node.dispatchEvent(event);
  },

  unlock() {
    this.unlock = true;
  },

  unlockRegister() {
    logger.INFO('player unlock notch directly');

    this.node.parent.getComponent('notchManager').addToLocalCache(this.info);
  },
});
