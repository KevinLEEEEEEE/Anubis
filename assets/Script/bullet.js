import {Global} from './Global'

const {ccclass, property} = cc._decorator;

@ccclass
export default class bullet extends cc.Component {

    @property
    speed = 200;

    onLoad () {
        this.rigidBody = this.node.getComponent(cc.RigidBody);
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        //子弹消失动画
        Global.putBullet(this.node);    //作为回调函数
    }

    init(position, dir) {
        this.node.position = position;

        const speedX = dir * this.speed;

        this.rigidBody.linearVelocity = cc.v2(speedX, 0);
    }

}


