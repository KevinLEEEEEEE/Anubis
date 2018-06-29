
cc.Class({
  extends: cc.Component,

  properties: {

  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {
    this.node.on('iEmergencyReq', this.reqHandler, this);
    this.node.on('tEmergencyRes', this.resHandler, this);
  },

  init(ID) {
    this.ID = ID;
  },

  reqHandler(event) {
    const eventCustom = new cc.Event.EventCustom('tEmergencyReq', true);
    eventCustom.setUserData({
      ID: this.ID,
      event,
    });
    this.node.dispatchEvent(eventCustom);
  },

  resHandler(event) {
    console.log(event.detail);
  },

});
