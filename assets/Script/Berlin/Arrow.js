import { ArrowManagementSystem } from './ArrowsManagementSystem'



cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 200,//箭矢的移动速度
    },

    onLoad () {
        this.rigidBody = this.node.getComponent(cc.RogigBody);
    },

    onBeginContact(contact, selfCollider, otherCollider){

        //Animtion 箭矢消失的帧动画

        ArrowManagementSystem.putArrow(this.node);
    },

    init( position, dir ) {
        
        this.node.position = position;
        const speed = dir * this.moveSpeed;
        this.rigidBody.linearVelocity = cc.v2(speed, 0);//子弹的线性速度

    }
});
