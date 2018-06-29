// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

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

    // ֻ��������ײ������Ӵ�ʱ������һ��
    onEndContact(contact, selfCollider, otherCollider) {

    },

    // ÿ�ν�Ҫ������ײ��Ӵ��߼�ʱ������
    onPreSolve(contact, selfCollider, otherCollider) {


    },

    // ÿ�δ�������ײ��Ӵ��߼�ʱ������
    onPostSolve(contact, selfCollider, otherCollider) {

    },
    onLoad() {

        // this.rock.getComponent(cc.RigidBody).gravityScale = 0;

    },

    start() {

    },


});
