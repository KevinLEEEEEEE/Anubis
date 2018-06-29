
const {ccclass, property} = cc._decorator;

@ccclass
export default class oneSidePlatform extends cc.Component {
    
    onLoad() {
        this.pointVelPlatform = cc.v2();
        this.pointVelOther = cc.v2();
        this.relativeVel = cc.v2();
        this.relativePoint = cc.v2();
    }

    onBeginContact(contact, selfCollider, otherCollider) { // 这里是参考视频里的代码，原资料百度Box2D，应该是借用C++的代码

        const otherBody = otherCollider.body;

        if (otherBody.node._name === 'bullet') {
            return;
        }

        const platformBody = selfCollider.body;
        const worldManifold = contact.getWorldManifold();
        const { points } = { points: worldManifold.points };

        const {
            pointVelPlatform, pointVelOther, relativeVel, relativePoint,
        } = {
            pointVelPlatform: this.pointVelPlatform,
            pointVelOther: this.pointVelOther,
            relativeVel: this.relativeVel,
            relativePoint: this.relativePoint,
        };

        const length = points.length;

        for (let i = 0; i < length; i += 1) {
            platformBody.getLinearVelocityFromWorldPoint(points[i], pointVelPlatform);
            otherBody.getLinearVelocityFromWorldPoint(points[i], pointVelOther);
            platformBody.getLocalVector(pointVelOther.subSelf(pointVelPlatform), relativeVel);

            if (relativeVel.y < -32) {
                return;
            } else if (relativeVel.y < 32) {
                platformBody.getLocalPoint(points[i], relativePoint);
                const platformFaceY = selfCollider.getAABB().height / 2;
                if (relativePoint.y > platformFaceY - (0.1 * 32)) {
                    return;
                }
            }
        }
        contact.disabled = true; // 这里设置了contact（即代表本次碰撞）失效，碰撞失效则物体可以通过
    }
}

