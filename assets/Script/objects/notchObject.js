import objectList from '../config/objectList';
import logger from '../utils/logger';

cc.Class({
  extends: cc.Component,

  properties: {
    require: {
      default: objectList.default,
      type: objectList,
    },
    match: 0,
  },

  // LIFE-CYCLE CALLBACKS:

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

    event.setUserData({
      require: this.require,
      match: this.match,
    });

    this.node.dispatchEvent(event);
  },

  notchUnDetect() {
    const event = new cc.Event.EventCustom('notchUnDetect', true);

    this.node.dispatchEvent(event);
  },

  unlock() {
    logger.INFO(`notch unlock: ${this.match}`);
  },

  report() {
    logger.INFO(`notch report from: ${this.match}`);
    return {
      require: this.require,
      match: this.match,
    };
  },
});
