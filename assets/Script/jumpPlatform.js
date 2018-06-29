
const {ccclass, property} = cc._decorator;

@ccclass
export default class jumpPlatform extends cc.Component {

    @property
    height = 800;

    onBeginContact(contact, selfCollider, otherCollider) {
        const Manifold = contact.getWorldManifold(); // 获取碰撞详细信息，可以cc.log看一下具体有哪些信息~
        
        if (Manifold.normal.y < 1) { // 如果不是在上侧的碰撞（速度分量介于0~1之间，从上向下的碰撞，y在x轴上没有分速度，十字分解！）
            return;
        }
        // other即为人物，self为跳板，因为检测程序设置在跳板上，其他同理
        // 这里和视频的不一样，直接设置了竖向速度，效果也很好
        otherCollider.body.linearVelocity = cc.v2(0, this.height);
    }
}
