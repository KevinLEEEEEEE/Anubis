import logger from '../utils/logger';

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.mousedown, this);

    const inventory = cc.find('Canvas/inventory');
    this.inventoryMethods = inventory.getComponent('inventoryManager');
  },

  init(type, level, match) {
    this.type = type;
    this.level = level;
    this.match = match;
    logger.DEBUG(`init inventoryObject - type: ${type} level: ${level} match: ${match}`);
  },

  mousedown() {
    // highlight the item

    logger.INFO('inventoryObject detect mousedown');
    this.inventoryMethods.mousedown({
      node: this,
      type: this.type,
      level: this.level,
      match: this.match,
    });
  },

  remove() {
    this.node.active = false;
  },

});
