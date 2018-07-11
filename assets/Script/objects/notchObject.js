import logger from '../utils/logger';

const notchObjectType = cc.Enum({
  key: 0,
  door: 1,
});

cc.Class({
  extends: cc.Component,

  properties: {
    notchType: {
      default: notchObjectType.key,
      type: notchObjectType,
    },
  },

  onLoad() {
    if (this.unlock === true) {
      this.node.emit('unlock');
    }
  },

  init(info) {
    this.info = info;

    this.contactActive = this.notchType === notchObjectType.key;

    this.node.on('unlockRegister', this.unlockRegister, this);
  },

  onDisable() {
    this.node.off('unlockRegister', this.unlockRegister, this);
  },

  onBeginContact() {
    if (Reflect.has(this, 'info') && this.contactActive) {
      logger.INFO('player contact notch');

      this.notchDetect();
    }
  },

  onEndContact() {
    if (Reflect.has(this, 'info') && this.contactActive) {
      logger.INFO('player discontact notch');

      this.notchUnDetect();
    }
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
    logger.INFO('unlock notch from cache');

    this.unlock = true;
  },

  unlockRegister() {
    logger.INFO('player unlock notch directly');

    this.node.parent.getComponent('notchManager').addToLocalCache(this.info);
  },
});
