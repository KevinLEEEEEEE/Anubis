import objectList from '../config/objectList';
import logger from '../utils/logger';

cc.Class({
  extends: cc.Component,

  properties: {
    type: {
      default: objectList.key,
      type: objectList,
    },
    match: 0,
    recovery: {
      default: 0,
      visible() {
        return this.type === objectList.blood;
      },
    },
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;

    contact.disabled = true; // the collection is uncontactable

    if (otherBody.node.group !== 'player') {
      return;
    }

    // play animation
    logger.INFO(`player obtain collection: ${this.match}`);

    this.collectionDetect();
    this.remove();
  },

  collectionDetect() {
    const event = new cc.Event.EventCustom('collectionDetect', true);

    event.setUserData({
      type: this.type,
      match: this.match,
      recovery: this.recovery,
    });

    this.node.dispatchEvent(event);
  },

  report() {
    return {
      type: this.type,
      match: this.match,
    };
  },

  remove() {
    this.node.active = false;
    logger.INFO(`collection remove from parent: ${this.match}`);
  },
});
