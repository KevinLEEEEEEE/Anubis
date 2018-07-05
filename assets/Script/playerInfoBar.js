import { Info } from './Global';

let self = null;

const infoBar = {
  updateData() {
    self.updateData();
  },
};

cc.Class({
  extends: cc.Component,

  properties: {
    HP: {
      default: null,
      type: cc.Label,
    },
    XP: {
      default: null,
      type: cc.Label,
    },
  },

  onLoad() {
    this.updateData();
    self = this;
  },

  updateData() {
    this.HP.string = Info.getHP();
    this.XP.string = Info.getXP();
  },
});

export default infoBar;
