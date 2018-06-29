
const {ccclass, property} = cc._decorator;

@ccclass
export default class physicalBound extends cc.Component {

    onLoad() {
        const thickness = 10;
        const width = this.node.width;
        const height = this.node.height;
        const node = new cc.Node();

        const body = node.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Static;

        this.addBound(node, width / 2, -thickness, width + thickness, thickness);
        // this.addBound(node, width / 2, height + thickness, width + thickness, thickness);
        this.addBound(node, -thickness, height / 2, thickness, height + 3 * thickness);
        this.addBound(node, width + thickness, height / 2, thickness, height + 3 * thickness);

        node.parent = this.node;
    }

    addBound(node, x, y, width, height) {
        const collider = node.addComponent(cc.PhysicsBoxCollider);
        collider.offset.x = x;
        collider.offset.y = y;
        collider.size.width = width;
        collider.size.height = height;
    }
}