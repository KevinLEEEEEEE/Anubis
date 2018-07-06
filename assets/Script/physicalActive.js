
const {ccclass, property} = cc._decorator;

@ccclass
export default class physicalActive extends cc.Component {
    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags =
            0;
            // cc.PhysicsManager.DrawBits.e_aabbBit |
            // cc.PhysicsManager.DrawBits.e_pairBit |
            // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            // cc.PhysicsManager.DrawBits.e_jointBit |
            // cc.PhysicsManager.DrawBits.e_shapeBit; // 激活物理组件与debug框
            // localStorage.sets();
    }
}
