import objectList from '../config/objectList';

cc.Class({
  extends: cc.Component,

  properties: {
    type: {
      default: objectList.key,
      type: objectList,
    },
    decorationMatch: {
      default: 'none',
      visible() {
        return this.type === objectList.decoration;
      },
    },
    keyMatch: {
      default: 'none',
      visible() {
        return this.type === objectList.key;
      },
    },
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

    this.inventoryAdd();

    // play animation

    this.remove();
  },

  inventoryAdd() {
    const inventory = cc.find('Canvas/inventory');
    const inventoryMethods = inventory.getComponent('inventoryManager');

    switch (this.type) {
    case objectList.decoration:
      break;
    case objectList.key:
      inventoryMethods.add({
        type: this.type,
        info: this.keyMatch,
      }); // add to the inventory
      break;
    default:
    }
  },

  remove() {
    this.node.active = false;
  },
});
