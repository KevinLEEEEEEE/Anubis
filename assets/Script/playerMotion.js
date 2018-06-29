
const {ccclass, property} = cc._decorator;
const MOVE_LEFT = -1;
const MOVE_RIGHT = 1;
const STAND = 0;

@ccclass
export default class playerInfoBar extends cc.Component {

    @property
    maxSpeed = 300;

    @property                                 
    acceleration = 1500;

    @property
    jumpSpeed = 300;

    @property
    drag = 600;

    @property(cc.Node)
    renderTarget = null;

    @property(cc.Node)
    btnNode = null;

    @property
    maze = false;

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        const btnGroup = this.btnNode._children;

        this.nodeEvent(btnGroup);

        this.canJump = true;

        this.moveFlags = 0;

        this.up = false;

        this.body = this.getComponent(cc.RigidBody);

    }

    nodeEvent(btnGroup) {
        btnGroup[0].on(cc.Node.EventType.TOUCH_START, () => {
            this.onKeyDown(cc.KEY.a);
        });
        btnGroup[0].on(cc.Node.EventType.TOUCH_END, () => {
            this.onKeyUp(cc.KEY.a);
        });
        btnGroup[1].on(cc.Node.EventType.TOUCH_START, () => {
            this.onKeyDown(cc.KEY.d);
        });
        btnGroup[1].on(cc.Node.EventType.TOUCH_END, () => {
            this.onKeyUp(cc.KEY.d);
        });
        btnGroup[2].on(cc.Node.EventType.TOUCH_START, () => {
            this.onKeyDown(cc.KEY.w);
        });
        btnGroup[2].on(cc.Node.EventType.TOUCH_END, () => {
            this.onKeyUp(cc.KEY.w);
        });
    }

    onKeyDown(event) {
        const keyCode = event.keyCode ? event.keyCode : event;
        switch (keyCode) {
        case cc.KEY.a:
        case cc.KEY.left:
            //播放左走动画
            this.moveFlags = MOVE_LEFT;
            break;
        case cc.KEY.d:
        case cc.KEY.right:
            //播放右走动画
            this.moveFlags = MOVE_RIGHT;
            break;
        case cc.KEY.w:
        case cc.KEY.up:
            if (!this.upPressed && this.canJump) {
                this.up = true;
            }
            this.upPressed = true;
            break;
        default:
        }
    }

    onKeyUp(event) {
        const keyCode = event.keyCode ? event.keyCode : event;
        switch (keyCode) {
        case cc.KEY.a:
        case cc.KEY.left:
        case cc.KEY.d:
        case cc.KEY.right:
            //动画停止
            this.moveFlags = STAND;
            break;
        case cc.KEY.w:
        case cc.KEY.up:
            this.upPressed = false;
            break;
        default:
        }
    }

    update(dt) {
        const speed = this.body.linearVelocity;

        if(this.maze) {
            speed.x = -speed.x;
        }

        const target = this.renderTarget;

        if (this.moveFlags === MOVE_RIGHT) {
            if (target.scaleX < 0) {
                target.scaleX *= -1;
            }
            speed.x += this.acceleration * dt;
            if (speed.x > this.maxSpeed) {
                speed.x = this.maxSpeed;
            }
        } else if (this.moveFlags === MOVE_LEFT) {
            if (target.scaleX > 0) {
                target.scaleX *= -1;
            }
            speed.x -= this.acceleration * dt;
            if (speed.x < -this.maxSpeed) {
                speed.x = -this.maxSpeed;
            }
        } else if (speed.x !== 0) {
            const d = this.drag * dt;
            if (Math.abs(speed.x) <= d) {
                speed.x = 0;
            } else {
                speed.x -= speed.x > 0 ? d : -d;
            }
        }

        if (Math.abs(speed.y) < 1) {
            this.canJump = true;
        }

        if (this.up && this.canJump) {
            this.up = false;
            this.canJump = false;
            speed.y = this.jumpSpeed;
        }

        if(this.maze) {
            speed.x = -speed.x;
        }

        this.body.linearVelocity = speed;
    }
};
