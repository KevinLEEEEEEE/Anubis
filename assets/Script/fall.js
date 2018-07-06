cc.Class({
  extends: cc.Component,

  properties: {
    rock: {
      default: null,
      type: cc.Node,
    },

  },

  onBeginContact(contact, selfCollider, otherCollider) {
    const rigid = this.rock.getComponent(cc.RigidBody);
    rigid.awake = true;
    rigid.gravityScale = 2;
    // rigid.linearVelocity = cc.v2(0, -100);
  },

  onEndContact(contact, selfCollider, otherCollider) {

  },

  onPreSolve(contact, selfCollider, otherCollider) {


  },

  onPostSolve(contact, selfCollider, otherCollider) {

  },
  onLoad() {

    // this.rock.getComponent(cc.RigidBody).gravityScale = 0;

  },

  start() {

  },


});
