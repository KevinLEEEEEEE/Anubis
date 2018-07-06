cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onBeginContact(contact, selfCollider, otherCollider){
        
        contact.disabled = true;

        const otherBody = otherCollider.body.node.group;
        if(otherBody === 'player'){
            //这里要加入减血的代码
            const X = this.node.getPositionX();
            const Y = this.node.getPositionY();
            const action = cc.moveTo(0.1, X, Y + 50);
            this.node.runAction(action);
        }
        
    },

    onEndContact(contact, selfCollider, otherCollider){

        const otherBody = otherCollider.body.node.group;
        if(otherBody === 'player'){
            const X = this.node.getPositionX();
            const Y = this.node.getPositionY();
            // const action = cc.moveTo(0.01, X, Y - 50);
            // this.node.runAction(action);
            this.node.setPosition(X, Y - 50);
        }

    }

});
