
cc.Class({
  extends: cc.Component,

  properties: {
    match: 'none',
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  onBeginContact(contact, selfCollider, otherCollider) {
    const { node } = otherCollider.body;

    if (node.group !== 'player') {
      return;
    }

    this.notchDetect();

    // play animation

    // open the door
  },

  notchDetect() {
    const event = new cc.Event.EventCustom('notchDetect', true);

    event.setUserData({
      match: this.match,
    });

    this.node.dispatchEvent(event);
  },

  unlock() {
    console.log('unlock');
  },

  // update (dt) {},
});
