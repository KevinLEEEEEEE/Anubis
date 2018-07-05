import objectList from '../config/objectList';

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

    const selfInfo = selfCollider.getAABB();

    const otherInfo = otherCollider.getAABB();

    this.notchDetect(selfInfo, otherInfo);

    // play animation
  },

  notchDetect(selfInfo, otherInfo) {
    const event = new cc.Event.EventCustom('notchDetect', true);

    event.setUserData({
      require: this.require,
      match: this.match,
      selfInfo,
      otherInfo,
    });

    this.node.dispatchEvent(event);

    console.log(`notch '${this.match}' detect contact`);
  },

  unlock() {
    console.log(`notch unlock : ${this.match}`);
  },

  report() {
    console.log(`notch report : ${this.match}`);
    return {
      require: this.require,
      match: this.match,
    };
  },
});
