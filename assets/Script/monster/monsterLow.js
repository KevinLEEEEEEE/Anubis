import Global from '../Global';

const monsterState = cc.Enum({
  FROZEN: 0,
  CHASING: 1,
});

cc.Class({
  extends: cc.Component,

  properties: {
    moveSpeed: 0,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.body = this.node.getComponent(cc.RigidBody);
    this.count = 0;
    this.frozen();
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;
    if (otherBody.node.group === 'player') {
      if (this.state === monsterState.FROZEN) {
        this.count += 1;
        if (this.count === 2) {
          this.wakeUp();
        }
      } else {
        cc.log('catch you');
      }
    }
  },

  onEndContact(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;
    if (otherBody.node.group === 'player') {
      if (this.state === monsterState.CHASING) {
        this.count -= 1;
        if (this.count === 0) {
          this.frozen();
        }
      }
    }
  },

  frozen() {
    // stop the movement and start detect
    this.node.runAction(cc.fadeTo(1.0, 100));
    this.state = monsterState.FROZEN;
  },

  wakeUp() {
    this.node.runAction(cc.fadeTo(1.0, 255));
    this.state = monsterState.CHASING;
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
