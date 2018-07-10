import logger from '../utils/logger';

cc.Class({
  extends: cc.Component,

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.mousedown, this);
    this.node.on(cc.Node.EventType.MOUSE_ENTER, this.mouseenter, this);
    this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.mouseleave, this);
  },

  init(info) {
    this.info = info;

    this.node.opacity = 150;

    logger.DEBUG(`init inventoryObject - level: ${info.level}  match: ${info.match}`);
  },

  mousedown() {
    const event = new cc.Event.EventCustom('runCheck', true);

    event.setUserData(this.info);

    this.node.dispatchEvent(event);
  },

  mouseenter() {
    this.node.opacity = 255;
  },

  mouseleave() {
    this.node.opacity = 150;
  },

  remove() {
    this.node.active = false;
  },

});
