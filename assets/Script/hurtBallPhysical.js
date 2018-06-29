import {Info} from './Global'
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() { },

    start() {

    },

    update(dt) {

    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        //如果是人物碰撞，HP-1，如果是子弹，HP不变
        const otherBody = otherCollider.body;//

        if (otherBody.node._name === 'hero') {
            Info.setHP(-1);
            
        }
        //荆棘球消失
        if (otherBody.node._name === 'bullet')
            this.node.active = false;

    },
});
