
cc.Class({
    extends: cc.Component,

    properties: {
        // pickRadius: 0,
        // hero: {
        //     default: null,
        //     type: cc.Node,
        // },
        addMaxSpeed: 200,
        addAcceleration: 200,
        addJumpSpeed: 200,
        duration: 2,
    },

    onLoad() {
        const hero = cc.find('hero');
        this.playerMotion = hero.getComponent('playerMotion');
        this.used = false;
        // this.speed = playerMotion.linearVelocity;
    },

    // getHeroDistance() {
    //     const heroPos = this.hero.getPosition();
    //     const dist = cc.pDistance(this.node.position, heroPos);
    //     return dist;
    // },

    onBeginContact(contact, selfCollider, otherCollider) {
        if (this.used) return;

        const otherBody = otherCollider.body;

        if (otherBody.node._name !== 'hero') {
            return;
        }

        this.speedUp();
    },

    speedUp() {
        this.used = true;
        this.node.opacity = 0;

        this.playerMotion.maxSpeed += this.addMaxSpeed;
        this.playerMotion.acceleration += this.addAcceleration;
        this.playerMotion.jumpSpeed += this.addJumpSpeed;
        this.scheduleOnce(() => {
            this.reset();
            this.node.destroy();
        }, this.duration);
    },

    reset() {
        this.playerMotion.maxSpeed -= this.addMaxSpeed;
        this.playerMotion.acceleration -= this.addAcceleration;
        this.playerMotion.jumpSpeed -= this.addJumpSpeed;
    },

    // update() {
    //     if (this.getHeroDistance() < this.pickRadius) {
    //         this.speedUp();
    //     }
    // },
});
