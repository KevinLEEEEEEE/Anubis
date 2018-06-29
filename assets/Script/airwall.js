
cc.Class({
    extends: cc.Component,

    onBeginContact() {
        this.node.opacity = 255;
    },
});
