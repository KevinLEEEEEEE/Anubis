import logger from '../utils/logger';

cc.Class({
  extends: cc.Component,

  init(info) {
    this.info = info;
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;

    contact.disabled = true; // the collection is uncontactable

    if (otherBody.node.group !== 'player') {
      return;
    }

    // play animation
    logger.INFO(`player obtain collection: ${this.info.match}`);

    this.collectionDetect();

    this.remove();
  },

  collectionDetect() {
    const event = new cc.Event.EventCustom('collectionDetect', true);

    event.setUserData(this.info);

    this.node.dispatchEvent(event);
  },

  remove() {
    this.node.active = false;

    logger.INFO('collection remove from parent');
  },
});
