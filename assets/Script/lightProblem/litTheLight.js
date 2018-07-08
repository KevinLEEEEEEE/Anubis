let sth = cc.Class(new Proxy({
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
  } 
}))

cc.Class({
  extends: cc.Component,
  properties: {
    lights:{
      default: [],
      type: sth,
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {

  },

  start() {
  },

  update() {

  },

  click(e) {
    var hang = e.target.getComponent('lightToggle').getPX();
    var lie = e.target.getComponent('lightToggle').getPY();
    for(var i = 0; i < 3; i++)
      for(var j = 0; j < 3; j++){
        if(i === hang || j === lie){
          const cell = this.lights[i].light[j];
          this.lights[i].light[j].getComponent('lightToggle').lightToggle();
        }
      }
  },


});
