
cc.Class({
  extends: cc.Component,

  properties: {

  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    const inventory = cc.find('Canvas/inventory');
    this.inventoryMethods = inventory.getComponent('inventoryManager');
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;
    const { node } = otherBody;

    if (node.group !== 'notch') {
      return;
    }
    contact.disabled = true;

    this.notchDetect(node);

    // play animation
    // open?
  },

  notchDetect(otherNode) {
    this.inventoryMethods.detect(otherNode);
  },

  // update (dt) {},
});
