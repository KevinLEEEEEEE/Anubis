
cc.Class({
  extends: cc.Component,

  properties: {
    round: {
      default: [],
      type: cc.Node,
    },
    rotation: {
      default: [],
      type: cc.Integer,
    },
    bg: cc.Node,
    door: cc.Node,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.radius = 0;
    this.action = cc.moveTo(0.1, 1100, 1100);
    console.log(this.round[1].rotation);
  },

  start() {

  },

  // update (dt) {},
  click(e) {
    const mousePosition = e.getLocation();
    const tempPosition = e.target.parent.convertToNodeSpaceAR(mousePosition);
    const distance = (tempPosition.x ** 2) + (tempPosition.y ** 2);
    console.log(distance);
    if (distance <= (60 ** 2)) {
      this.radius = 5;
    } else if (distance <= (80 ** 2)) {
      this.radius = 4;
    } else if (distance <= (100 ** 2)) {
      this.radius = 3;
    } else if (distance <= (120 ** 2)) {
      this.radius = 2;
    } else if (distance <= (140 ** 2)) {
      this.radius = 1;
    }
    switch (this.radius) {
    case 1:
      this.round[0].rotation += 30;
      this.rotation[0] += 30;
      this.rotation[0] %= 360;
      break;
    case 2:
      this.round[1].rotation += 30;
      this.rotation[1] += 30;
      this.rotation[1] %= 360;
      break;
    case 3:
      this.round[2].rotation += 30;
      this.rotation[2] += 30;
      this.rotation[2] %= 360;
      break;
    case 4:
      this.round[3].rotation += 30;
      this.rotation[3] += 30;
      this.rotation[3] %= 360;
      break;
    case 5:
      this.round[4].rotation += 30;
      this.rotation[4] += 30;
      this.rotation[4] %= 360;
      break;
    default:
      break;
    }
    this.check();
  },
  check() {
    if (this.rotation[4] === this.rotation[3]
      && this.rotation[4] === this.rotation[2] && this.rotation[1] === this.rotation[0]) {
      this.scheduleOnce(() => {
        this.node.runAction(this.action);
        this.bg.setOpacity(0);
        //
        this.scheduleOnce(() => {
          this.unlock();
        }, 2);
      }, 2);
    }
    this.door.emit('unlockRegister'); // the door will always be unlocked
  },
  unlock() {
    console.log(this.door);
  },
});
