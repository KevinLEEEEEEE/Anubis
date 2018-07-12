import Global from '../Global';

const monsterState = cc.Enum({
  FROZEN: 0,
  CHASING: 1,
});

cc.Class({
  extends: cc.Component,

  properties: {
    moveSpeed: 0,
    tracking: false,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.body = this.node.getComponent(cc.RigidBody);
    this.frozen();
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;
    if (otherBody.node.group === 'player') {
      if (this.state === monsterState.FROZEN) {
        this.toChasing();
      } else {
        cc.log('catch you');
      }
    }
  },

  onEndContact(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;
    if (otherBody.node.group === 'player') {
      if (this.state === monsterState.CHASING) {
        this.toFrozen();
      }
    }
  },

  frozen() {
    // stop the movement and start detect
    this.state = monsterState.FROZEN;
  },

  toChasing() {
    cc.log('unfrozen animation');
    this.node.opacity = 255;
    this.chasing();
  },

  chasing() {
    this.state = monsterState.CHASING;
  },

  toFrozen() {
    cc.log('frozen animation');
    this.node.opacity = 100;
    this.frozen();
  },

  update() {
    if (this.state === monsterState.CHASING) {
      const playerPos = Global.getPlayerPosition();
      const playerNodePos = this.node.parent.convertToNodeSpaceAR(playerPos);
      const monsterPos = this.node.getPosition();
      const speed = this.body.linearVelocity;

      if (playerNodePos.x < monsterPos.x) {
        speed.x = -this.moveSpeed;
      } else {
        speed.x = this.moveSpeed;
      }

      this.body.linearVelocity = speed;
    } else {
      this.body.linearVelocity = cc.v2(0, 0);
    }
  },
});
