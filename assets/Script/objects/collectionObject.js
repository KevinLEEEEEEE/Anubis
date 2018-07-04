import objectList from '../config/objectList';

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

    contact.disabled = true;

    if (otherBody.node.group !== 'player') {
      return;
    }

    // play animation

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

  remove() {
    this.node.active = false;
  },
});
