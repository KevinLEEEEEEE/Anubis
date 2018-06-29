
const {ccclass, property} = cc._decorator;

@ccclass
export default class cameraControl extends cc.Component {

    @property(cc.Node)
    target = null;

    @property(cc.Node)
    sizeNode = null;

    onLoad() {
        this.size = this.sizeNode._contentSize;

        this.visiableW = this.node.width / 2;
        this.visiableH = this.node.height / 2;

        this.widthRightLimit =  this.size.width - this.visiableW;
        this.heightTopLimit = this.size.height - this.visiableH;

        this.camera = this.getComponent(cc.Camera);
    }

    onEnable() {
        // 关键，为了将camera的debug框架（粉色那个），绑定到目标上
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
    }

    lateUpdate (dt) {
        const node = this.node;
        const target = this.target;

        const nodeX = node.x;
        const nodeY = node.y;
        const targetX = target.x;
        const targetY = target.y;

        let position = cc.v2(targetX, targetY);

        if(targetX - this.visiableW < 0) {
            position.x = this.visiableW;
        } else if ((this.size.width - targetX) - this.visiableW < 0) {
            position.x = this.widthRightLimit
        }

        if(targetY - this.visiableH < 0) {
            position.y = this.visiableH;
        } else if ((this.size.height - targetY) - this.visiableH < 0) {
            position.y = this.heightTopLimit;
        }
        
        node.position = position;
    }
}