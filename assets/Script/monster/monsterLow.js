import Global from '../Global';

const monsterState = cc.Enum({
  PATROL: 0,
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
    this.state = monsterState.PATROL;
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;
    if (otherBody.node.group === 'player') {
      if (this.state === monsterState.CHASING) {
        cc.log('you dead');
      } else {
        this.state = monsterState.CHASING;
        cc.log('chasing');
      }
    }
  },

  onEndContact(contact, selfCollider, otherCollider) {
    const otherBody = otherCollider.body;
    if (otherBody.node.group === 'player') {
      if (this.state === monsterState.CHASING) {
        this.state = monsterState.PATROL;
        cc.log('patrol');
      }
    }
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
