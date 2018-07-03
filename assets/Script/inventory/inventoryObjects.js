
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

  init(type, match) {
    this.type = type;
    this.match = match;
  },

  mousedown() {
    // highlight
    // no bag btn - dock like inventory
    this.inventoryMethods.mousedown({
      node: this,
      type: this.type,
      match: this.match,
    });
  },

});
