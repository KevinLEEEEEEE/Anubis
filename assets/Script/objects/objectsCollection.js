
cc.Class({
  extends: cc.Component,

  properties: {
    type: 'none',
    info: 'none',
  },

  onLoad() {
    const result = this.checkVisibility({
      type: this.type,
      info: this.info,
    });

    if (!result) { // if the object has been collected, then remove it
      this.remove();
    }
  },

  checkVisibility() {
    return true; // read from cache
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;

    if (otherBody.node.group !== 'player') {
      return;
    }
    contact.disabled = true;

    const inventory = cc.find('Canvas/inventory');
    const inventoryMethods = inventory.getComponent('inventoryManager');

    inventoryMethods.add({
      type: this.type,
      info: this.info,
    }); // add to the inventory

    // play animation

    this.remove();
  },

  remove() {
    this.node.active = false;
  },
});
