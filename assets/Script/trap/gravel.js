cc.Class({
  extends: cc.Component,

  properties: {
  },

  init(that, position, fallingSpeed) {
    this.that = that;
    this.node.position = position;
    cc.log('我出来啦！');
    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -fallingSpeed);
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body.node.group;
    contact.disabled = true;
    if (otherBody === 'player') {
      console.log('疼!');
      this.that.putGravel(this.node);
    }
  },
});
