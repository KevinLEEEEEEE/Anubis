import objectList from '../config/objectList';

cc.Class({
  extends: cc.Component,

  properties: {
    type: {
      default: objectList.key,
      type: objectList,
    },
    match: 'none',
  },

  onLoad() {
    const result = this.checkVisibility({
      type: this.type,
      match: this.match,
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

    this.inventoryAdd();

    // play animation

    this.remove();
  },

  inventoryAdd() {
    const inventory = cc.find('Canvas/inventory');
    const inventoryMethods = inventory.getComponent('inventoryManager');

    inventoryMethods.add({
      type: this.type,
      match: this.match,
    }); // add to the inventory
  },

  remove() {
    this.node.active = false;
  },
});
