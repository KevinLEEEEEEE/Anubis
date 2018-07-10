
const sth = cc.Class(new Proxy({
  name: 'aLight',
  properties: {
    row: 0,
    light: [cc.Node],
  },
}, {
  get(target, property) {
    return target[property];
  },
  set(obj, prop, value) {
    obj[prop] = value;
  },
}));

cc.Class({
  extends: cc.Component,
  properties: {
    lights: {
      default: [],
      type: sth,
    },
    whiteNum: 0,
    bg: cc.Node,
    door: cc.Node,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.color = cc.Color.WHITE;
    this.action = cc.moveTo(0.1, 1500, 1500);

    this.node.on('unlock', this.unlock, this); // listen to unlock event from parent
  },

  clickReturn() {
    this.node.runAction(this.action);
    this.bg.setOpacity(0);
  },

  click(e) {
    const lightToggle = e.target.getComponent('lightToggle');
    const row = lightToggle.getPX();
    const col = lightToggle.getPY();
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        if (i === row || j === col) {
          const cell = this.lights[i].light[j];
          if (cell._color.equals(this.color)) {
            cell.getComponent('lightToggle').lightOff();
            this.setNumReduce();
          } else {
            cell.getComponent('lightToggle').lightUp();
            this.setNumPlus();
            this.checkNum();
          }
        }
      }
    }
  },

  checkNum() {
    if (this.getNum() === 9) {
      cc.log('你打开了门！');
      // 禁用所有按钮
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          const cell = this.lights[i].light[j];
          cell.getComponent(cc.Button).interactable = false;
        }
      }
      this.openTheDoor();

      this.node.emit('unlockRegister'); // the door will always be unlocked
    }
  },

  openTheDoor() {
    this.scheduleOnce(() => {
      this.node.runAction(this.action);
      this.bg.setOpacity(0);
      // 播放帧动画
      this.scheduleOnce(() => {
        this.unlock();
      }, 2);
    }, 2);
  },

  unlock() {
    this.door.active = false;
  },

  getNum() {
    return this.whiteNum;
  },

  setNumPlus() {
    this.whiteNum += 1;
  },

  setNumReduce() {
    this.whiteNum -= 1;
  },


});
