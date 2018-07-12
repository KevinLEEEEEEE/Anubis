cc.Class({
  extends: cc.Component,

  properties: {

    player: cc.Node,
    gravityScale: 4,

  },

  onLoad() {
    this.isContact = false;
    this.distance = 150;
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body.node.group;
    if (otherBody === 'player') {
      this.schedule(() => {
        this.playerPositionX = this.player.getPositionX();
        if ((this.node.getPositionX() - this.playerPositionX) <= this.distance) {
          this.isContact = true;
          if (this.isContact) {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -200);
            // contact.disabled = true;
          }
        }
      }, 0.5);
    }
  },
});
