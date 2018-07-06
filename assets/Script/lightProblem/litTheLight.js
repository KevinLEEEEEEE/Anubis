
cc.Class({
  extends: cc.Component,

  properties: {
    whiteNum: 0,
    light00: {
      default: null,
      type: cc.Button,
    },
    light01: {
      default: null,
      type: cc.Button,
    },
    light02: {
      default: null,
      type: cc.Button,
    },
    light10: {
      default: null,
      type: cc.Button,
    },
    light11: {
      default: null,
      type: cc.Button,
    },
    light12: {
      default: null,
      type: cc.Button,
    },
    light20: {
      default: null,
      type: cc.Button,
    },
    light21: {
      default: null,
      type: cc.Button,
    },
    light22: {
      default: null,
      type: cc.Button,
    },


  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
  },

  start() {
  },

  update() {

  },

  click(e) {
    console.log(this.whiteNum);
    if (e.target._name === '00') {
      this.light00.getComponent('lightToggle').lightToggle();
      this.light01.getComponent('lightToggle').lightToggle();
      this.light02.getComponent('lightToggle').lightToggle();
      this.light10.getComponent('lightToggle').lightToggle();
      this.light20.getComponent('lightToggle').lightToggle();
    }
    if (e.target._name === '01') {
      this.light00.getComponent('lightToggle').lightToggle();
      this.light01.getComponent('lightToggle').lightToggle();
      this.light02.getComponent('lightToggle').lightToggle();
      this.light11.getComponent('lightToggle').lightToggle();
      this.light21.getComponent('lightToggle').lightToggle();
    }
    if (e.target._name === '02') {
      this.light00.getComponent('lightToggle').lightToggle();
      this.light01.getComponent('lightToggle').lightToggle();
      this.light02.getComponent('lightToggle').lightToggle();
      this.light12.getComponent('lightToggle').lightToggle();
      this.light22.getComponent('lightToggle').lightToggle();
    }
    if (e.target._name === '10') {
      this.light10.getComponent('lightToggle').lightToggle();
      this.light11.getComponent('lightToggle').lightToggle();
      this.light12.getComponent('lightToggle').lightToggle();
      this.light00.getComponent('lightToggle').lightToggle();
      this.light20.getComponent('lightToggle').lightToggle();
    }
    if (e.target._name === '11') {
      this.light11.getComponent('lightToggle').lightToggle();
      this.light01.getComponent('lightToggle').lightToggle();
      this.light21.getComponent('lightToggle').lightToggle();
      this.light10.getComponent('lightToggle').lightToggle();
      this.light12.getComponent('lightToggle').lightToggle();
    }
    if (e.target._name === '12') {
      this.light12.getComponent('lightToggle').lightToggle();
      this.light10.getComponent('lightToggle').lightToggle();
      this.light11.getComponent('lightToggle').lightToggle();
      this.light02.getComponent('lightToggle').lightToggle();
      this.light22.getComponent('lightToggle').lightToggle();
    }
    if (e.target._name === '20') {
      this.light00.getComponent('lightToggle').lightToggle();
      this.light21.getComponent('lightToggle').lightToggle();
      this.light22.getComponent('lightToggle').lightToggle();
      this.light10.getComponent('lightToggle').lightToggle();
      this.light20.getComponent('lightToggle').lightToggle();
    }
    if (e.target._name === '21') {
      this.light20.getComponent('lightToggle').lightToggle();
      this.light21.getComponent('lightToggle').lightToggle();
      this.light01.getComponent('lightToggle').lightToggle();
      this.light11.getComponent('lightToggle').lightToggle();
      this.light22.getComponent('lightToggle').lightToggle();
    }
    if (e.target._name === '22') {
      this.light22.getComponent('lightToggle').lightToggle();
      this.light02.getComponent('lightToggle').lightToggle();
      this.light12.getComponent('lightToggle').lightToggle();
      this.light20.getComponent('lightToggle').lightToggle();
      this.light21.getComponent('lightToggle').lightToggle();
    }
  },
  getWhiteNum() {
    return this.whiteNum;
  },


});
