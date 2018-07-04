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

  // onLoad () {},

  onBeginContact(contact, selfCollider, otherCollider) {
    const { node } = otherCollider.body;

    contact.disabled = true;

    if (node.group !== 'player') {
      return;
    }

    this.notchDetect();

    // play animation

    // open the door
  },

  tracking() {

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

  },

  unlock() {
    console.log('unlock');
  },

  // update (dt) {},
});
