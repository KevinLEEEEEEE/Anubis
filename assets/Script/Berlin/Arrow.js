cc.Class({
  extends: cc.Component,

  properties: {
    moveSpeed: 200, // 箭矢的移动速度
    moveDistance: 800, // 箭矢发射后的运动距离
  },

  onLoad() {
    // this.rigidBody = this.node.getComponent(cc.RigidBody);
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    // Animtion 箭矢消失的帧动画

    ArrowManagementSystem.putArrow(this.node);
  },

  init() {
    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed, 0);// 子弹的线性速度
  },
});
