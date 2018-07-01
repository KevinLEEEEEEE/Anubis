const motions = cc.Enum({
  STAND: 0,
  MOVE_LEFT: 1,
  MOVE_RIGHT: 2,
});

cc.Class({
  extends: cc.Component,

  properties: {
    maxSpeed: 300,
    acceleration: 1500,
    jumpSpeed: 600,
    drag: 600,
    target: cc.Node,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.isJump = false;

    this.canJump = true;

    this.moveFlags = motions.STAND;

    this.body = this.getComponent(cc.RigidBody);
  },

  left() {
    this.moveFlags = motions.MOVE_LEFT;
  },

  right() {
    this.moveFlags = motions.MOVE_RIGHT;
  },

  stand() {
    this.moveFlags = motions.STAND;
  },

  up() {
    if (!this.upPressed && this.canJump) {
      this.isJump = true;
    }
    this.upPressed = true;
  },

  down() {
    this.upPressed = false;
  },

  update(dt) {
    const speed = this.body.linearVelocity;

    const { target } = this;

    if (this.moveFlags === motions.MOVE_RIGHT) {
      if (target.scaleX < 0) {
        target.scaleX *= -1;
      }
      speed.x += this.acceleration * dt;
      if (speed.x > this.maxSpeed) {
        speed.x = this.maxSpeed;
      }
    } else if (this.moveFlags === motions.MOVE_LEFT) {
      if (target.scaleX > 0) {
        target.scaleX *= -1;
      }
      speed.x -= this.acceleration * dt;
      if (speed.x < -this.maxSpeed) {
        speed.x = -this.maxSpeed;
      }
    } else if (speed.x !== 0) {
      const d = this.drag * dt;
      if (Math.abs(speed.x) <= d) {
        speed.x = 0;
      } else {
        speed.x -= speed.x > 0 ? d : -d;
      }
    }

    if (Math.abs(speed.y) < 1) {
      this.canJump = true;
    }

    if (this.isJump && this.canJump) {
      this.isJump = false;
      this.canJump = false;
      speed.y = this.jumpSpeed;
    }

    this.body.linearVelocity = speed;
  },
});
