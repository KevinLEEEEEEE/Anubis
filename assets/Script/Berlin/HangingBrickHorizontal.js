// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        moveDistance: 200,//左右移动的距离
        moveTime: 2,//移动一次的时间
    },

    onLoad () {

        var seq = cc.repeatForever(cc.sequence(
            cc.moveBy(this.moveTime,this.moveDistance,0),
            cc.moveBy(this.moveTime,-this.moveDistance,0),
        ));
        this.node.runAction(seq);

    }
});
