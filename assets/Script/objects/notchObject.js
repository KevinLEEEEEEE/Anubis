import logger from '../utils/logger';

cc.Class({
  extends: cc.Component,

  init(info) {
    this.info = info;
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    const { node } = otherCollider.body;

    contact.disabled = true;

    if (node.group !== 'player') {
      return;
    }

    logger.INFO(`player contact notch: ${this.match}`);

    this.notchDetect();

    // play animation
  },

  onEndContact(contact, selfCollider, otherCollider) {
    const { node } = otherCollider.body;

    if (node.group !== 'player') {
      return;
    }

    logger.INFO(`player discontact notch: ${this.match}`);

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
    logger.INFO(`notch unlock: ${this.info.match}`);
  },
});
