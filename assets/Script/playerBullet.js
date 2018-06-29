import {Global} from './Global'

const {ccclass, property} = cc._decorator;

@ccclass
export default class playerBullet extends cc.Component {
    @property(cc.Prefab)
    bullet = null;

    @property(cc.Node)
    parentNode = null;

    @property(cc.Node)
    btnNode = null;

    @property(cc.Node)
    target = null;

    onLoad() {
        const btnGroup = this.btnNode["_children"];
        
        const initCount = this.count;

        this.nodeEvent(btnGroup);

        this.upPressed = false;

        this.timeGap = true;
    }

    nodeEvent(btnGroup) {
        btnGroup[3].on(cc.Node.EventType.TOUCH_START, () => {
            if (!this.upPressed && this.timeGap) {
                this.shot();
                this.timeGap = false;
                this.scheduleOnce(()=>{
                    this.timeGap = true;
                }, 2);
            }
            this.upPressed = true;
        });
        btnGroup[3].on(cc.Node.EventType.TOUCH_END, () => {
            this.upPressed = false;
        });
    }

    shot() {
        const { position, dir } = {
            position: this.node.position, dir: this.target.scaleX,
        };

        let bullet = Global.getBullet();

        bullet.parent = this.parentNode;
        bullet.getComponent('bullet').init(position, dir);
    }
}
